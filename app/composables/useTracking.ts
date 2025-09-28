export const useTracking = () => {
  const { consent } = useConsent()
  const route = useRoute()

  // Helper to safely push to dataLayer
  const pushToDataLayer = (data: Record<string, unknown>) => {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push(data)
    }
  }

  // Update consent state in GTM dataLayer
  const onUpdateConsent = () => {
    // Push consent update with Google's Consent Mode v2 field names
    pushToDataLayer({
      event: 'consent_update',
      'analytics_storage': consent.value.analytics ? 'granted' : 'denied',
      'ad_storage': consent.value.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.value.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.value.marketing ? 'granted' : 'denied',
      'functionality_storage': 'granted', // Always granted for necessary cookies
      'security_storage': 'granted' // Always granted for necessary cookies
    })
  }

  /**
   * Generic tracking with standard or custom events pushed to GTM dataLayer
   * @param eventName - Standard event name (generate_lead, sign_up, purchase, etc.) or custom
   * @param parameters - Event parameters including value, currency, etc.
   */
  const track = (eventName: string, parameters?: Record<string, unknown>) => {
    // Check consent before tracking - NO events are exempt from consent
    if (!consent.value.analytics) {
      if (import.meta.dev) {
        console.log(`[GTM] Event blocked (no consent): ${eventName}`)
      }
      return
    }

    // Always add context (check window exists for SSR safety)
    const enrichedParams = {
      page_path: route.path,
      page_url: typeof window !== 'undefined' ? window.location.href : '',
      locale: useNuxtApp().$i18n.locale.value,
      ...parameters
    }

    // Debug logging in development
    if (import.meta.dev) {
      console.log(`[GTM] ${eventName}:`, enrichedParams)
    }

    // Push event to GTM dataLayer with error boundary
    try {
      pushToDataLayer({
        event: eventName,
        ...enrichedParams
      })
    } catch (error) {
      console.warn('[GTM] Failed to send event:', error)
    }
  }

  return {
    track,
    onUpdateConsent
  }
}
