import type { ValidLocale, LocaleConfig } from '~/types/locale'

/**
 * Simple country detection composable
 * Clean interface for locale management
 */
export function useCountryDetection() {
  const { locale, locales } = useI18n()
  const nuxtApp = useNuxtApp()
  
  // Get current locale config
  const currentLocale = computed(() => {
    return (locales.value as LocaleConfig[]).find(l => l.code === locale.value)
  })
  
  // Get suggested locale from server detection via payload
  const suggestedLocale = computed(() => {
    // Check payload for detected locale
    const detected = nuxtApp.payload.detectedLocale as ValidLocale | undefined
    
    // Only suggest if different from current locale
    if (detected && detected !== locale.value) {
      return detected
    }
    return undefined
  })
  
  // Get suggested locale config
  const suggestedLocaleConfig = computed(() => {
    if (!suggestedLocale.value) return null
    return (locales.value as LocaleConfig[]).find(l => l.code === suggestedLocale.value)
  })
  
  // Check if user was just redirected
  const wasRedirected = computed(() => {
    const cookie = useCookie('konty-locale')
    if (!cookie.value) return false
    try {
      const parsed = JSON.parse(cookie.value as string)
      return parsed.wasRedirected === true
    } catch {
      return false
    }
  })
  
  // Check if user has made an explicit locale choice
  const hasExplicitChoice = computed(() => {
    const cookie = useCookie('konty-locale')
    if (!cookie.value) return false
    try {
      const parsed = JSON.parse(cookie.value as string)
      return parsed.explicit === true
    } catch {
      return false
    }
  })
  
  // Should we show suggestion banner?
  const shouldShowSuggestion = computed(() => {
    // Never show if user made explicit choice
    if (hasExplicitChoice.value) return false
    
    // Show if was just redirected OR locale mismatch detected
    return wasRedirected.value || 
      (!!suggestedLocale.value && suggestedLocale.value !== locale.value)
  })
  
  // Switching state
  const isSwitching = ref(false)
  
  /**
   * Change locale and save preference
   */
  async function changeLocale(newLocale: ValidLocale, isExplicit: boolean = true) {
    if (isSwitching.value || locale.value === newLocale) return
    
    isSwitching.value = true
    
    try {
      // Update cookie
      const cookie = useCookie('konty-locale')
      cookie.value = JSON.stringify({
        locale: newLocale,
        explicit: isExplicit,
        wasRedirected: false  // Clear any redirect flag when manually changing
      })
      
      // Update i18n locale
      locale.value = newLocale
      
      await nextTick()
    } finally {
      isSwitching.value = false
    }
  }
  
  /**
   * Accept suggested locale
   */
  async function acceptSuggestion() {
    if (suggestedLocale.value) {
      await changeLocale(suggestedLocale.value, true)
    }
  }
  
  /**
   * Dismiss suggestion (mark current as explicit choice)
   */
  function dismissSuggestion() {
    const cookie = useCookie('konty-locale')
    cookie.value = JSON.stringify({
      locale: locale.value,
      explicit: true,
      wasRedirected: false  // Clear flag
    })
  }
  
  return {
    // Current state
    currentLocale: readonly(currentLocale),
    suggestedLocale: readonly(suggestedLocale),
    suggestedLocaleConfig: readonly(suggestedLocaleConfig),
    shouldShowSuggestion: readonly(shouldShowSuggestion),
    isSwitching: readonly(isSwitching),
    
    // Actions
    changeLocale,
    acceptSuggestion,
    dismissSuggestion
  }
}