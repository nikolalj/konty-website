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
  
  // Get suggested locale from server payload
  const suggestedLocale = computed(() => {
    return nuxtApp.payload.suggestedLocale as ValidLocale | undefined
  })
  
  // Get suggested locale config
  const suggestedLocaleConfig = computed(() => {
    if (!suggestedLocale.value) return null
    return (locales.value as LocaleConfig[]).find(l => l.code === suggestedLocale.value)
  })
  
  // Should we show suggestion banner?
  const shouldShowSuggestion = computed(() => {
    return !!suggestedLocale.value && suggestedLocale.value !== locale.value
  })
  
  // Switching state
  const isSwitching = ref(false)
  
  /**
   * Get locale cookie
   */
  function getLocaleCookie() {
    const cookie = useCookie('konty-locale')
    if (!cookie.value) return null
    
    try {
      return JSON.parse(cookie.value as string)
    } catch {
      return null
    }
  }
  
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
        explicit: isExplicit
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
      explicit: true
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