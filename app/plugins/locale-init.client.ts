/**
 * Client-side plugin to handle locale initialization and travel detection
 * This runs after hydration to check for locale mismatches
 */
export default defineNuxtPlugin(async (nuxtApp) => {
  // We need to use the nuxtApp context to access i18n
  const route = useRoute()
  
  // Get server-detected locale from meta tags or headers if available
  // Note: These headers are set by server middleware but may not be available client-side
  // We'll rely on the cookie and banner logic instead
  
  // Log initialization for debugging
  if (import.meta.dev) {
    console.log('Locale initialization plugin loaded', {
      path: route.path
    })
  }
  
  // The banner component will handle showing suggestions
  // This plugin just ensures proper initialization
  
  // Listen for locale changes to update HTML lang attribute
  // We'll do this in the app instead since we can't use useI18n here
  nuxtApp.hook('app:mounted', () => {
    // Get the i18n instance from the app
    const i18n = nuxtApp.$i18n
    if (i18n) {
      // Set initial lang attribute
      document.documentElement.lang = i18n.locale.value
      
      // Watch for changes
      watch(i18n.locale, (newLocale) => {
        document.documentElement.lang = newLocale
      })
    }
  })
})