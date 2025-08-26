import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'
import type { ReaderModel } from '@maxmind/geoip2-node'
import { Reader } from '@maxmind/geoip2-node'
import { existsSync } from 'fs'
import { join } from 'path'
import { DEFAULT_LOCALE, COUNTRY_TO_LOCALE_MAP } from '../../config/locale.config'

export interface LocaleCookie {
  locale: ValidLocale
  explicit: boolean
}

/**
 * Country detection with MaxMind and API fallback
 * Simple, clean, all in one file
 */

// MaxMind database reader (singleton)
let maxmindReader: ReaderModel | null = null

// Simple IP-based cache with lazy cleanup
interface CacheEntry {
  country: string | null
  timestamp: number
}
const detectionCache = new Map<string, CacheEntry>()
const CACHE_TTL = 60 * 60 * 1000 // 60 minutes
const MAX_CACHE_SIZE = 1000 // Prevent unbounded growth

/**
 * Get cached country for IP with lazy expiry check
 */
function getCachedCountry(ip: string): string | null | undefined {
  const entry = detectionCache.get(ip)
  if (!entry) return undefined

  // Lazy cleanup - delete expired on access
  if (Date.now() - entry.timestamp > CACHE_TTL) {
    detectionCache.delete(ip)
    return undefined
  }

  return entry.country
}

/**
 * Cache country detection result with size limit
 */
function setCachedCountry(ip: string, country: string | null) {
  // Prevent unbounded growth - FIFO eviction
  if (detectionCache.size >= MAX_CACHE_SIZE) {
    // Delete oldest entry (first in Map)
    const firstKey = detectionCache.keys().next().value
    if (firstKey) detectionCache.delete(firstKey)
  }

  detectionCache.set(ip, {
    country,
    timestamp: Date.now()
  })
}

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
    return await Reader.open(dbPath)
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
  const ip = getClientIP(event)
  if (!ip) return null

  // Check cache first
  const cached = getCachedCountry(ip)
  if (cached !== undefined) {
    return cached // Can be null (meaning we cached a failed detection)
  }

  let country: string | null = null

  // 1. Try MaxMind database (fast, local)
  const reader = await initMaxMind()
  if (reader) {
    try {
      const result = reader.country(ip)
      if (result.country?.isoCode) {
        country = result.country.isoCode
        setCachedCountry(ip, country)
        return country
      }
    } catch {
      // IP not found in database
    }
  }

  // 2. Fallback to API (slower)
  try {
    const response = await $fetch<{ country?: string }>('https://api.country.is/', {
      timeout: 1500,
      retry: 0
    })
    if (response?.country) {
      country = response.country
    }
  } catch {
    // API failed
  }

  // Cache the result (even if null to avoid repeated lookups)
  setCachedCountry(ip, country)
  return country
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
 * Detect user's current locale based on IP
 * Always returns a locale (DEFAULT_LOCALE if detection fails)
 */
export async function detectUserLocale(event: H3Event): Promise<{
  locale: ValidLocale
  isNewUser: boolean
  detectedCountry?: string
}> {
  try {
    // Always detect current location (don't rely on cookie)
    const country = await getCountryFromIP(event)
    const locale = countryToLocale(country)

    // Check if user is new (no cookie)
    const cookie = getLocaleCookie(event)
    const isNewUser = !cookie

    return {
      locale,
      isNewUser,
      detectedCountry: country || undefined
    }
  } catch (error) {
    // If anything fails, return default locale
    console.error('[Locale Detection]', error)

    return {
      locale: DEFAULT_LOCALE,
      isNewUser: true,
      detectedCountry: undefined
    }
  }
}
