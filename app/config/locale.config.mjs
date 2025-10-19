// Locale configuration shared between Nuxt and Edge wrapper
// This is an .mjs file so it can be imported by both TypeScript and the Worker wrapper

export const DEFAULT_LOCALE = {
  code: 'rs',
  iso: 'sr-RS',
  name: 'Srbija',
  file: 'rs.json',
  flag: 'i-circle-flags:rs',
  currency: 'RSD',
  currencySymbol: 'RSD',
  uses12HourFormat: false,
  dateTimeSeparator: 'u'
};

export const LOCALES = [
  DEFAULT_LOCALE,
  {
    code: 'me',
    iso: 'sr-ME',
    name: 'Crna Gora',
    file: 'me.json',
    flag: 'i-circle-flags:me',
    currency: 'EUR',
    currencySymbol: '€',
    uses12HourFormat: false,
    dateTimeSeparator: 'u'
  },
  {
    code: 'ba',
    iso: 'bs-BA',
    name: 'Bosna i Hercegovina',
    file: 'ba.json',
    flag: 'i-circle-flags:ba',
    currency: 'BAM',
    currencySymbol: 'KM',
    uses12HourFormat: false,
    dateTimeSeparator: 'u'
  },
  {
    code: 'us',
    iso: 'en-US',
    name: 'United States',
    file: 'us.json',
    flag: 'i-circle-flags:us',
    currency: 'USD',
    currencySymbol: '$',
    uses12HourFormat: true,
    dateTimeSeparator: 'at'
  }
];

export const LOCALE_STRATEGY = 'prefix_except_default';

export const VALID_LOCALES = ['me', 'rs', 'ba', 'us'];

export const COUNTRY_TO_LOCALE_MAP = {
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
};