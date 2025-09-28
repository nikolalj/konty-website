/**
 * Central tracking orchestrator plugin
 * Manages consent mode initialization, page tracking, and engagement metrics
 */

export default defineNuxtPlugin(() => {
  // Import only what we need
  const { consentGiven } = useConsent()
  const { track, onUpdateConsent } = useTracking()
  const router = useRouter()

  // ============================================
  // CONSENT MODE INITIALIZATION
  // ============================================

  // Set DEFAULT consent mode before ANY tracking
  // Push consent defaults to GTM dataLayer using Google's standard fields
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []

    // TODO forces approving of cookies by default. Remove in the future.
    window.dataLayer.push({
      event: 'consent_default',
      'analytics_storage': 'granted',
      'ad_storage': 'granted',
      'ad_user_data': 'granted',
      'ad_personalization': 'granted',
      'functionality_storage': 'granted',
      'security_storage': 'granted',
    })

    // window.dataLayer.push({
    //   event: 'consent_default',
    //   'analytics_storage': 'denied',
    //   'ad_storage': 'denied',
    //   'ad_user_data': 'denied',
    //   'ad_personalization': 'denied',
    //   'functionality_storage': 'granted',
    //   'security_storage': 'granted',
    // })
  }

  // If user has previously given consent, apply it immediately
  if (consentGiven.value) {
    onUpdateConsent()
  }

  // Listen for future consent changes
  if (typeof window !== 'undefined') {
    window.addEventListener('consent:updated', () => {
      onUpdateConsent()
    })
  }

  // ============================================
  // ERROR TRACKING
  // ============================================

  if (typeof window !== 'undefined') {
    const trackError = (event: ErrorEvent) => {
      // Skip in development to avoid noise
      if (import.meta.dev) {
        console.error('[Tracking] Error captured but not tracked (dev mode):', event)
        return
      }

      // Track JavaScript errors that could impact conversion
      track('exception', {
        description: event.message,
        fatal: false,
        error_source: `${event.filename}:${event.lineno}:${event.colno}`,
        page_path: router.currentRoute.value.path
      })
    }

    window.addEventListener('error', trackError)
  }
})
