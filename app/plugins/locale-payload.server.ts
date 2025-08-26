/**
 * Server-side plugin to inject detected locale into payload
 */
export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent()

  // Get detected locale from middleware context
  // Use Nuxt's payload system
  if (event?.context?.detectedLocale) {
    nuxtApp.payload.detectedLocale = event.context.detectedLocale
  }
})
