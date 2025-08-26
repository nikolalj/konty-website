/**
 * Server-side plugin to inject detected locale into payload
 */
export default defineNuxtPlugin((nuxtApp) => {
  const event = useRequestEvent()

  if (event?.context?.detectedLocale) {
    nuxtApp.payload.detectedLocale = event.context.detectedLocale
  }
})
