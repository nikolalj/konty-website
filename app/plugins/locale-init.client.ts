/**
 * Client-side plugin to handle locale initialization and travel detection
 * This runs after hydration to check for locale mismatches
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  // Get server-detected locale from meta tags or headers if available
  // Note: These headers are set by server middleware but may not be available client-side
  // We'll rely on the cookie and banner logic instead

  // The banner component will handle showing suggestions
  // This plugin just ensures proper initialization

  // Listen for locale changes to update HTML lang attribute
  nuxtApp.hook('app:mounted', () => {
    // Simple approach - just set the lang attribute once
    // The i18n module should handle updates automatically
    const htmlElement = document.documentElement
    const currentLang = htmlElement.lang

    if (!currentLang) {
      // If no lang set, try to get from i18n
      try {
        const i18nLocale = (nuxtApp.$i18n as { locale?: string | { value?: string } })?.locale
        if (i18nLocale) {
          const localeValue = typeof i18nLocale === 'string'
            ? i18nLocale
            : i18nLocale?.value

          if (localeValue) {
            htmlElement.lang = localeValue
          }
        }
      } catch (e) {
        console.debug('Could not set initial lang attribute', e)
      }
    }
  })
})
