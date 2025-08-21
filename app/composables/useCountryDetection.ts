import type { Locale } from 'vue-i18n';
import type {
  ValidLocale,
  LocaleConfig,
  DetectCountryResponse,
  CountryLocaleMap
} from '~/types/locale'

/**
 * Maps country codes to our locale codes
 */
const COUNTRY_TO_LOCALE_MAP: CountryLocaleMap = {
  'ME': 'me', // Montenegro
  'RS': 'rs', // Serbia
  'BA': 'ba', // Bosnia
  'US': 'us', // United States
  // Fallback for neighboring countries
  'HR': 'ba', // Croatia -> Bosnia (similar language)
  'SI': 'rs', // Slovenia -> Serbia
  'MK': 'rs', // Macedonia -> Serbia
  'AL': 'me', // Albania -> Montenegro
  // English-speaking countries -> US
  'GB': 'us', // United Kingdom
  'CA': 'us', // Canada
  'AU': 'us', // Australia
}

const VALID_LOCALES = ['me', 'rs', 'ba', 'us'] as const

const CACHE_KEY = 'konty-country-detection'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour in milliseconds

/**
 * Detect user's country from IP address
 * Uses multiple HTTPS fallback services for reliability
 */
export const useCountryDetection = () => {
  const { locale, locales, setLocale } = useI18n()

  // Loading and error states
  const isDetecting = ref(false)
  const detectionError = ref<string | null>(null)
  const isSwitching = ref(false)

  // Cookie configuration with better defaults
  const localeCookie = useCookie<string | null>('konty-locale', {
    httpOnly: false,
    secure: import.meta.client && window.location.protocol === 'https:',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    encode: value => encodeURIComponent(value || ''),
    decode: value => value ? decodeURIComponent(value) : null
  })

  /**
   * Validate if a locale code is valid
   */
  const validateLocaleCookie = (value: unknown): value is ValidLocale => {
    return typeof value === 'string' && VALID_LOCALES.includes(value as ValidLocale)
  }

  /**
   * Sanitize locale code to ensure it's valid
   */
  const sanitizeLocaleCode = (code: string): ValidLocale => {
    const sanitized = code?.toLowerCase()?.trim()
    return VALID_LOCALES.includes(sanitized as ValidLocale) ? sanitized as ValidLocale : 'rs'
  }

  /**
   * Get cached country detection from sessionStorage
   */
  const getCachedDetection = (): string | null => {
    if (!import.meta.client) return null

    try {
      const cached = sessionStorage.getItem(CACHE_KEY)
      if (!cached) return null

      const parsed = JSON.parse(cached)
      if (!parsed?.country || !parsed?.timestamp) {
        sessionStorage.removeItem(CACHE_KEY)
        return null
      }

      const { country, timestamp } = parsed
      const now = Date.now()

      // Check if cache is still valid
      if (now - timestamp < CACHE_TTL) {
        console.log('Using cached country detection:', country)
        return country
      }

      // Clear expired cache
      sessionStorage.removeItem(CACHE_KEY)
    } catch (error) {
      console.warn('Failed to read detection cache, clearing:', error)
      try {
        sessionStorage.removeItem(CACHE_KEY)
      } catch {
        // Silent fail if sessionStorage is not available
      }
    }

    return null
  }

  /**
   * Save country detection to cache
   */
  const setCachedDetection = (country: string): void => {
    if (!import.meta.client) return

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({
        country,
        timestamp: Date.now()
      }))
    } catch (error) {
      // Storage might be full or disabled
      console.warn('Failed to save detection cache:', error)
    }
  }

  /**
   * Detect country from IP using server-side endpoint
   */
  const detectCountryFromIP = async (): Promise<string | null> => {
    // Check cache first
    const cached = getCachedDetection()
    if (cached) return cached

    try {
      // Use server-side endpoint to bypass CORS
      const response = await $fetch<DetectCountryResponse>('/api/detect-country', { timeout: 3000 })
      const countryCode = response.country

      if (countryCode) {
        setCachedDetection(countryCode)
        return countryCode
      }
    } catch (error) {
      console.warn('IP detection failed:', error)
    }

    return null
  }

  /**
   * Get locale code from country code
   */
  const getLocaleFromCountry = (countryCode: string): ValidLocale => {
    const mapped = COUNTRY_TO_LOCALE_MAP[countryCode.toUpperCase()]
    return mapped ? sanitizeLocaleCode(mapped) : 'rs' // Default to Serbia
  }

  /**
   * Initialize locale on app start
   * Main entry point for locale detection
   */
  const initializeLocale = async (): Promise<void> => {
    // Skip if already detecting
    if (isDetecting.value) return

    isDetecting.value = true
    detectionError.value = null

    try {
      // Step 1: Check for saved cookie preference
      const savedLocale = localeCookie.value as Locale
      if (savedLocale && VALID_LOCALES.includes(savedLocale as ValidLocale)) {
        console.log('Using saved locale preference:', savedLocale)

        // Only change if different
        if (locale.value !== savedLocale) {
          await setLocale(savedLocale)
        }
        return
      }

      // Step 2: Clear invalid cookie if exists
      if (savedLocale) {
        console.warn('Invalid locale cookie detected, clearing:', savedLocale)
        localeCookie.value = null
      }

      // Step 3: Try IP detection
      const countryCode = await detectCountryFromIP()

      if (countryCode) {
        const detectedLocale = getLocaleFromCountry(countryCode)
        console.log('Setting locale based on IP country:', countryCode, '->', detectedLocale)

        localeCookie.value = detectedLocale
        if (locale.value !== detectedLocale) {
          await setLocale(detectedLocale)
        }
      } else {
        // Step 4: Fallback to default locale
        const fallbackLocale = 'rs'
        console.log('IP detection failed, using default locale:', fallbackLocale)

        localeCookie.value = fallbackLocale
        if (locale.value !== fallbackLocale) {
          await setLocale(fallbackLocale)
        }
      }
    } catch (error) {
      console.error('Failed to initialize locale:', error)
      detectionError.value = 'Failed to detect location'

      // Ultimate fallback
      const fallback = 'rs'
      localeCookie.value = fallback
      if (locale.value !== fallback) {
        await setLocale(fallback)
      }
    } finally {
      isDetecting.value = false
    }
  }

  /**
   * Manually change locale (from dropdown)
   */
  const changeLocale = async (newLocale: string): Promise<void> => {
    const sanitized = sanitizeLocaleCode(newLocale)

    isSwitching.value = true
    detectionError.value = null

    try {
      console.log('Manually changing locale to:', sanitized)
      localeCookie.value = sanitized
      await setLocale(sanitized)
    } catch (error) {
      console.error('Failed to change locale:', error)
      detectionError.value = 'Failed to change language'
      throw error
    } finally {
      isSwitching.value = false
    }
  }

  /**
   * Get current locale info
   */
  const currentLocale = computed((): LocaleConfig | undefined => {
    const currentLocaleCode = locale.value
    return (locales.value as LocaleConfig[]).find(l => l.code === currentLocaleCode)
  })

  /**
   * Clear saved locale preference
   */
  const clearLocalePreference = (): void => {
    localeCookie.value = null
    if (import.meta.client) {
      sessionStorage.removeItem(CACHE_KEY)
    }
  }

  return {
    // Functions
    initializeLocale,
    changeLocale,
    clearLocalePreference,
    detectCountryFromIP,
    validateLocaleCookie,

    // State
    currentLocale,
    localeCookie,
    isDetecting: readonly(isDetecting),
    isSwitching: readonly(isSwitching),
    detectionError: readonly(detectionError),
  }
}
