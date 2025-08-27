/**
 * Lean tracking composable using GA4 standard events
 * Standard events enable Google Ads integration, ML insights, and automatic reporting
 */

export const useTracking = () => {
  const { gtag } = useGtag()
  const { locale, t } = useI18n()
  const route = useRoute()
  const config = useRuntimeConfig()
  const { hasAnalytics, hasMarketing } = useConsent()

  // No-op if gtag not available
  if (!gtag) {
    return {
      track: () => {},
      trackPage: () => {},
      updateConsentMode: () => {}
    }
  }

  // Update Google Consent Mode based on consent state
  const updateConsentMode = () => {
    gtag('consent', 'update', {
      'analytics_storage': hasAnalytics.value ? 'granted' : 'denied',
      'ad_storage': hasMarketing.value ? 'granted' : 'denied',
      'ad_user_data': hasMarketing.value ? 'granted' : 'denied',
      'ad_personalization': hasMarketing.value ? 'granted' : 'denied'
    })
  }

  // Watch for consent changes and update automatically
  watch([hasAnalytics, hasMarketing], () => {
    updateConsentMode()
  })

  /**
   * Generic tracking with GA4 standard or custom events
   * @param eventName - GA4 standard event name (generate_lead, sign_up, purchase, etc.) or custom
   * @param parameters - Event parameters including value, currency, etc.
   */
  const track = (eventName: string, parameters?: Record<string, unknown>) => {
    // Check consent before tracking (except for necessary cookies)
    const necessaryEvents = ['page_view'] // These can be tracked without consent
    if (!necessaryEvents.includes(eventName) && !hasAnalytics.value) {
      if (import.meta.dev) {
        console.log(`[GA4] Event blocked (no consent): ${eventName}`)
      }
      return
    }
    
    // Always add context
    const enrichedParams = {
      page_path: route.path,
      page_location: window.location.href,
      locale: locale.value,
      ...parameters
    }

    // Add currency for conversion events if not provided
    if (['generate_lead', 'sign_up', 'purchase', 'begin_checkout'].includes(eventName)) {
      if (!parameters?.currency) {
        Object.assign(enrichedParams, { currency: t('common.currency') })
      }
    }

    // Debug logging in development
    if (config.public.gaMeasurementId && import.meta.dev) {
      console.log(`[GA4] ${eventName}:`, enrichedParams)
    }

    // Safe gtag call with error boundary
    try {
      gtag('event', eventName, enrichedParams)
    } catch (error) {
      console.warn('[GA4] Failed to send event:', error)
    }
  }

  /**
   * Enhanced page view with business context
   * Uses GA4 standard 'page_view' event with custom parameters
   */
  const trackPage = () => {
    // Detect user intent from URL
    const getPageCategory = () => {
      const path = route.path
      if (path.includes('pricing')) return 'pricing'
      if (path.includes('demo')) return 'demo'
      if (path.includes('retail')) return 'product_retail'
      if (path.includes('hospitality')) return 'product_hospitality'
      if (path === '/') return 'home'
      return 'other'
    }

    track('page_view', {
      page_title: document.title,
      page_category: getPageCategory(),
      user_type: useCookie('user_type').value || 'visitor'
    })
  }

  return {
    track,
    trackPage,
    updateConsentMode
  }
}
