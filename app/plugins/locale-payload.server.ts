/**
 * Server-side plugin to inject detected locale into payload
 */
export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent()
  
  // Get detected locale from middleware context
  if (event?.context?.detectedLocale) {
    // Use Nuxt's payload system
    nuxtApp.payload.detectedLocale = event.context.detectedLocale
  }
})