import type { LocaleConfig, ValidLocale } from '../app/types/locale'

export const DEFAULT_LOCALE = {
  code: 'rs' as ValidLocale,
  iso: 'sr-RS',
  name: 'Srbija',
  file: 'rs.json',
  flag: 'i-circle-flags:rs',
  currency: 'RSD',
  currencySymbol: 'RSD'
}

export const LOCALES: LocaleConfig[] = [
  DEFAULT_LOCALE,
  {
    code: 'me',
    iso: 'sr-ME',
    name: 'Crna Gora',
    file: 'me.json',
    flag: 'i-circle-flags:me',
    currency: 'EUR',
    currencySymbol: '€'
  },
  {
    code: 'ba',
    iso: 'bs-BA',
    name: 'Bosna i Hercegovina',
    file: 'ba.json',
    flag: 'i-circle-flags:ba',
    currency: 'BAM',
    currencySymbol: 'KM'
  },
  {
    code: 'us',
    iso: 'en-US',
    name: 'United States',
    file: 'us.json',
    flag: 'i-circle-flags:us',
    currency: 'USD',
    currencySymbol: '$'
  }
]

export const LOCALE_STRATEGY = 'prefix_except_default'

export const VALID_LOCALES = ['me', 'rs', 'ba', 'us'] as ValidLocale[]

export const COUNTRY_TO_LOCALE_MAP: Record<string, ValidLocale> = {
  'ME': 'me',
  'RS': 'rs',
  'BA': 'ba',
  'US': 'us',
  // Fallback for neighboring countries
  'HR': 'ba',
  'MK': 'rs',
  'GB': 'us',
  'CA': 'us',
  'AU': 'us',
  'NZ': 'us',
  'IE': 'us',
}
