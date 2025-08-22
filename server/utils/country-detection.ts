import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'
import { DEFAULT_LOCALE, COUNTRY_TO_LOCALE_MAP } from '../../config/locale.config'

/**
 * Helper to safely try country detection from an API
 */
async function tryDetectCountry(
  url: string,
  extractor: (data: unknown) => string | undefined
): Promise<string | null> {
  try {
    const data = await $fetch(url, {
      timeout: 1500,  // Reduced timeout for faster fallback
      retry: 0       // Don't retry, move to next service
    })
    const result = extractor(data)
    return result || null
  } catch {
    // Silently fail and return null
    return null
  }
}

/**
 * Detects country from IP using multiple fallback services
 * Caches result in event context for request lifecycle
 * Always returns a valid result (never throws)
 */
export async function detectCountryFromIP(event: H3Event): Promise<string | null> {
  // Check if we already detected for this request
  if (event.context._detectedCountry !== undefined) {
    return event.context._detectedCountry
  }

  let detectedCountry: string | null = null

  try {
    // Try Cloudflare headers first (fastest, most reliable)
    const cfCountry = getHeader(event, 'cf-ipcountry')
    if (cfCountry && cfCountry !== 'XX' && cfCountry !== 'T1') {  // T1 = Tor network
      detectedCountry = cfCountry
    } else {
      // Try api.country.is
      detectedCountry = await tryDetectCountry(
        'https://api.country.is/',
        (data) => (data as { country?: string })?.country
      )

      // If failed, try ipapi.co
      if (!detectedCountry) {
        detectedCountry = await tryDetectCountry(
          'https://ipapi.co/json/',
          (data) => (data as { country_code?: string })?.country_code
        )
      }
    }
  } catch (error) {
    console.warn('[Locale Detection] Country detection failed:', error)
    detectedCountry = null
  }

  // Cache for this request (even if null)
  event.context._detectedCountry = detectedCountry
  return detectedCountry
}

/**
 * Maps country code to locale with intelligent fallbacks
 */
export function mapCountryToLocale(countryCode: string | null): ValidLocale {
  if (!countryCode) return DEFAULT_LOCALE

  const upperCode = countryCode.toUpperCase()
  return COUNTRY_TO_LOCALE_MAP[upperCode] || DEFAULT_LOCALE
}

/**
 * Complex preference cookie structure
 */
export interface LocalePreference {
  explicit_locale?: ValidLocale    // User manually selected
  detected_country?: string         // Where they actually are
  detected_locale?: ValidLocale     // What we detected
  preference_type: 'manual' | 'detected' | 'default'
  timestamp: string
  dismissed_suggestion?: boolean    // User dismissed banner
}

/**
 * Parses locale preference cookie
 */
export function parseLocalePreference(cookieValue: string | null): LocalePreference | null {
  if (!cookieValue) return null

  try {
    // Handle both old simple format and new complex format
    if (cookieValue.includes('{')) {
      // New complex format
      return JSON.parse(cookieValue)
    } else if (['me', 'rs', 'ba', 'us'].includes(cookieValue)) {
      // Old simple format - migrate to new
      return {
        explicit_locale: cookieValue as ValidLocale,
        preference_type: 'manual',
        timestamp: new Date().toISOString()
      }
    }
  } catch (error) {
    console.warn('Failed to parse locale preference:', error)
  }

  return null
}

/**
 * Serializes locale preference for cookie storage
 */
export function serializeLocalePreference(pref: LocalePreference): string {
  return JSON.stringify(pref)
}

/**
 * Gets the effective locale from preference
 */
export function getEffectiveLocale(pref: LocalePreference | null): ValidLocale {
  if (pref?.explicit_locale) {
    return pref.explicit_locale
  }
  if (pref?.detected_locale) {
    return pref.detected_locale
  }
  return DEFAULT_LOCALE
}

/**
 * Checks if user is likely traveling (location changed significantly)
 */
export function isUserTraveling(pref: LocalePreference | null, currentCountry: string | null): boolean {
  if (!pref?.detected_country || !currentCountry) return false

  // Different country than last detection
  if (pref.detected_country !== currentCountry) {
    // But only if they haven't explicitly chosen a locale
    return pref.preference_type !== 'manual'
  }

  return false
}
