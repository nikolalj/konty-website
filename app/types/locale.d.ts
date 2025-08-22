import type { LocaleObject } from '@nuxtjs/i18n'

/**
 * Valid locale codes for the application
 */
export type ValidLocale = 'me' | 'rs' | 'ba' | 'us'

/**
 * Extended locale configuration with additional properties
 */
export interface LocaleConfig extends LocaleObject {
  code: ValidLocale
  iso: string
  name: string
  file: string
  flag: string
  currency: string
  currencySymbol: string
}

/**
 * IP geolocation API response types
 */
export interface GeoLocation {
  country: string
  country_code: string
  city?: string
  ip?: string
}

export interface IpWhoResponse {
  country_code: string
  country: string
  city?: string
}

export interface FreeIpApiResponse {
  countryCode: string
  countryName: string
  cityName?: string
}

/**
 * Country detection cache structure
 */
export interface DetectionCache {
  country: string
  timestamp: number
}

/**
 * Country to locale mapping type
 */
export type CountryLocaleMap = Record<string, ValidLocale>

/**
 * API response type for country detection
 */
export interface DetectCountryResponse {
  country: string
  method: 'country.is' | 'ipapi.co' | 'ipwho.is' | 'default'
}

/**
 * Locale preference structure for improved cookie
 */
export interface LocalePreference {
  explicit_locale?: ValidLocale    // User manually selected
  detected_country?: string         // Where they actually are  
  detected_locale?: ValidLocale     // What we detected
  preference_type: 'manual' | 'detected' | 'default'
  timestamp: string
  dismissed_suggestion?: boolean    // User dismissed banner
}