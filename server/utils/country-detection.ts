import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'
import { DEFAULT_LOCALE, COUNTRY_TO_LOCALE_MAP } from '../../config/locale.config'

/**
 * Simple country detection utility
 * Clean, straightforward, no overengineering
 */

/**
 * Get country from IP address
 * Returns 2-letter country code or null
 */
export async function getCountryFromIP(event: H3Event): Promise<string | null> {
  // 1. Try MaxMind database (fast, reliable)
  try {
    const { detectCountryWithMaxMind } = await import('./maxmind-detection')
    const country = await detectCountryWithMaxMind(event)
    if (country) return country
  } catch {
    // MaxMind not available, continue to fallback
  }

  // 2. Fallback to API (slower, but works without database)
  try {
    const response = await $fetch<{ country?: string }>('https://api.country.is/', {
      timeout: 1500,
      retry: 0
    })
    if (response?.country) return response.country
  } catch {
    // API failed, that's ok
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