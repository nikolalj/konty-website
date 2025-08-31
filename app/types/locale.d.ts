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
 * Locale cookie structure
 */
export interface LocaleCookie {
  locale: ValidLocale
  explicit: boolean
}