// Import types directly to avoid circular dependency
type ValidLocale = 'me' | 'rs' | 'ba' | 'us'

/**
 * Centralized locale configuration
 * Change DEFAULT_LOCALE here to update it everywhere
 */
export const LOCALE_CONFIG = {
  // Default locale for the site (used when no locale is detected or specified)
  DEFAULT_LOCALE: 'us' as ValidLocale,
  
  // Available locales
  VALID_LOCALES: ['me', 'rs', 'ba', 'us'] as ValidLocale[],
  
  // Strategy for URL prefixing
  STRATEGY: 'prefix_except_default' as const,
  
  // Country to locale mapping
  COUNTRY_TO_LOCALE_MAP: {
    'ME': 'me',
    'RS': 'rs',
    'BA': 'ba',
    'US': 'us',
    // Fallback for neighboring countries
    'HR': 'ba',
    'SI': 'rs',
    'MK': 'rs',
    'AL': 'me',
    // English-speaking countries
    'GB': 'us',
    'CA': 'us',
    'AU': 'us',
    'NZ': 'us',
    'IE': 'us',
  } as Record<string, ValidLocale>
}

export const DEFAULT_LOCALE = LOCALE_CONFIG.DEFAULT_LOCALE
export const VALID_LOCALES = LOCALE_CONFIG.VALID_LOCALES
export const COUNTRY_TO_LOCALE_MAP = LOCALE_CONFIG.COUNTRY_TO_LOCALE_MAP