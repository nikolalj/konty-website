import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'
import type { ReaderModel } from '@maxmind/geoip2-node'
import { Reader } from '@maxmind/geoip2-node'
import { existsSync } from 'fs'
import { join } from 'path'
import { DEFAULT_LOCALE, COUNTRY_TO_LOCALE_MAP } from '../../config/locale.config'

/**
 * Country detection with MaxMind and API fallback
 * Simple, clean, all in one file
 */

// MaxMind database reader (singleton)
let maxmindReader: ReaderModel | null = null

/**
 * Get client IP from request headers
 */
function getClientIP(event: H3Event): string | null {
  const headers = ['x-real-ip', 'x-forwarded-for', 'x-client-ip']

  for (const header of headers) {
    const value = getHeader(event, header)
    if (value) {
      const ip = value.split(',')[0]?.trim()
      // Skip local IPs
      if (ip && !ip.startsWith('127.') && !ip.startsWith('192.168.') && ip !== '::1') {
        return ip
      }
    }
  }
  return null
}

/**
 * Initialize MaxMind database reader
 */
async function initMaxMind(): Promise<ReaderModel | null> {
  if (maxmindReader) return maxmindReader

  const dbPath = join(process.cwd(), 'server', 'data', 'GeoLite2-Country.mmdb')
  if (!existsSync(dbPath)) {
    console.warn('[MaxMind] Database not found. Run: pnpm download-geolite2')
    return null
  }

  try {
    maxmindReader = await Reader.open(dbPath)
    console.log('[MaxMind] Database loaded')
    return maxmindReader
  } catch (error) {
    console.error('[MaxMind] Failed to load database:', error)
    return null
  }
}

/**
 * Get country from IP address
 * Returns 2-letter country code or null
 */
export async function getCountryFromIP(event: H3Event): Promise<string | null> {
  // 1. Try MaxMind database (fast, local)
  const reader = await initMaxMind()
  if (reader) {
    const ip = getClientIP(event)
    if (ip) {
      try {
        const result = reader.country(ip)
        if (result.country?.isoCode) {
          return result.country.isoCode
        }
      } catch {
        // IP not found in database
      }
    }
  }

  // 2. Fallback to API (slower)
  try {
    const response = await $fetch<{ country?: string }>('https://api.country.is/', {
      timeout: 1500,
      retry: 0
    })
    if (response?.country) return response.country
  } catch {
    // API failed
  }

  return null
}

/**
 * Convert country code to locale
 * Simple mapping with fallback to default
 */
export function countryToLocale(country: string | null): ValidLocale {
  if (!country) return DEFAULT_LOCALE
  return COUNTRY_TO_LOCALE_MAP[country.toUpperCase()] || DEFAULT_LOCALE
}

/**
 * Cookie structure - keep it simple
 * Just locale and whether user explicitly chose it
 */
export interface LocaleCookie {
  locale: ValidLocale
  explicit: boolean  // true = user chose, false = detected
}

/**
 * Get locale preference from cookie
 */
export function getLocaleCookie(event: H3Event): LocaleCookie | null {
  const cookieValue = getCookie(event, 'konty-locale')
  if (!cookieValue) return null

  try {
    return JSON.parse(cookieValue)
  } catch {
    // Invalid cookie, ignore it
    return null
  }
}

/**
 * Set locale preference in cookie
 */
export function setLocaleCookie(event: H3Event, locale: ValidLocale, explicit: boolean = false) {
  const cookie: LocaleCookie = { locale, explicit }

  setCookie(event, 'konty-locale', JSON.stringify(cookie), {
    httpOnly: false,    // Allow client-side access
    secure: !import.meta.dev,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365  // 1 year
  })
}

/**
 * Main detection logic - used by middleware
 * Simple flow: Cookie → Detection → Default
 */
export async function detectUserLocale(event: H3Event): Promise<{
  locale: ValidLocale
  isNewUser: boolean
  detectedCountry?: string
}> {
  // 1. Check cookie first (returning user)
  const cookie = getLocaleCookie(event)
  if (cookie) {
    return {
      locale: cookie.locale,
      isNewUser: false
    }
  }

  // 2. New user - detect country
  const country = await getCountryFromIP(event)
  const locale = countryToLocale(country)

  // 3. Save preference (not explicit yet)
  setLocaleCookie(event, locale, false)

  return {
    locale,
    isNewUser: true,
    detectedCountry: country || undefined
  }
}
