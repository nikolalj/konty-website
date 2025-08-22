import type {
  ValidLocale,
  LocaleConfig,
  LocalePreference
} from '~/types/locale'

/**
 * Composable for handling locale preferences and country detection
 * Works with the new cookie structure that tracks explicit vs detected choices
 */
export const useCountryDetection = () => {
  const { locale, locales, setLocale } = useI18n()

  // Loading and error states
  const isDetecting = ref(false)
  const isSwitching = ref(false)
  const detectionError = ref<string | null>(null)

  // Cookie with new structure
  const localeCookie = useCookie<string>('konty-locale', {
    httpOnly: false,
    secure: import.meta.client && window.location.protocol === 'https:',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365, // 1 year
    encode: value => encodeURIComponent(value || ''),
    decode: value => value ? decodeURIComponent(value) : ''
  })

  /**
   * Parse the locale preference from cookie
   */
  const parsePreference = (): LocalePreference | null => {
    const cookieValue = localeCookie.value
    if (!cookieValue) return null

    try {
      // Handle new JSON format
      if (cookieValue.includes('{')) {
        return JSON.parse(cookieValue)
      }
      // Migrate old simple format
      if (['me', 'rs', 'ba', 'us'].includes(cookieValue)) {
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
   * Get current preference
   */
  const preference = computed(() => parsePreference())

  /**
   * Get effective locale (what should be displayed)
   */
  const effectiveLocale = computed((): ValidLocale => {
    const pref = preference.value
    if (pref?.explicit_locale) return pref.explicit_locale
    if (pref?.detected_locale) return pref.detected_locale
    return locale.value as ValidLocale
  })

  /**
   * Check if we should show the suggestion banner
   */
  const shouldShowSuggestion = computed(() => {
    const pref = preference.value
    if (!pref) return false
    
    // Don't show if user has explicitly chosen (manual selection)
    if (pref.preference_type === 'manual' && pref.explicit_locale) return false
    
    // Don't show if already dismissed
    if (pref.dismissed_suggestion) return false
    
    // Show if detected locale differs from current
    const currentLocale = locale.value
    const detectedLocale = pref.detected_locale
    
    // For detected preferences, show banner if there's a mismatch
    return detectedLocale && detectedLocale !== currentLocale
  })

  /**
   * Manually change locale (from dropdown or banner)
   */
  const changeLocale = async (
    newLocale: string, 
    isExplicit: boolean = true
  ): Promise<void> => {
    isSwitching.value = true
    detectionError.value = null

    try {
      // Parse existing preference
      const pref = parsePreference() || {
        preference_type: 'default' as const,
        timestamp: new Date().toISOString()
      }

      // Update preference based on action type
      if (isExplicit) {
        pref.explicit_locale = newLocale as ValidLocale
        pref.preference_type = 'manual'
        // Clear dismissal since user is actively choosing
        delete pref.dismissed_suggestion
      } else {
        pref.detected_locale = newLocale as ValidLocale
        if (pref.preference_type === 'default') {
          pref.preference_type = 'detected'
        }
      }

      // Save updated preference
      localeCookie.value = JSON.stringify(pref)

      // Update i18n locale
      if (locale.value !== newLocale) {
        await setLocale(newLocale as ValidLocale)
      }
    } catch (error) {
      console.error('Failed to change locale:', error)
      detectionError.value = 'Failed to change language'
      throw error
    } finally {
      isSwitching.value = false
    }
  }

  /**
   * Dismiss the suggestion banner
   */
  const dismissSuggestion = () => {
    const pref = parsePreference()
    if (pref) {
      pref.dismissed_suggestion = true
      localeCookie.value = JSON.stringify(pref)
    }
  }

  /**
   * Get current locale config
   */
  const currentLocale = computed((): LocaleConfig | undefined => {
    const currentLocaleCode = locale.value
    return (locales.value as LocaleConfig[]).find(l => l.code === currentLocaleCode)
  })

  /**
   * Check if user is traveling (location changed)
   */
  const isTraveling = computed(() => {
    const pref = preference.value
    if (!pref) return false
    
    // Check if headers indicate different country
    if (import.meta.client) {
      // Would need to get this from server headers
      return false
    }
    
    return false
  })

  /**
   * Clear saved locale preference
   */
  const clearLocalePreference = (): void => {
    localeCookie.value = ''
  }

  return {
    // Functions
    changeLocale,
    dismissSuggestion,
    clearLocalePreference,

    // State
    preference: readonly(preference),
    effectiveLocale: readonly(effectiveLocale),
    shouldShowSuggestion: readonly(shouldShowSuggestion),
    currentLocale: readonly(currentLocale),
    isTraveling: readonly(isTraveling),
    isDetecting: readonly(isDetecting),
    isSwitching: readonly(isSwitching),
    detectionError: readonly(detectionError),
  }
}