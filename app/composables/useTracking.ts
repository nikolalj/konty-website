/**
 * Lean tracking composable using GA4 standard events
 * Standard events enable Google Ads integration, ML insights, and automatic reporting
 */
export const useTracking = () => {
  const { gtag } = useGtag()
  const { consent } = useConsent()
  const route = useRoute()

  // Update Google Consent Mode based on consent state
  const onUpdateConsent = () => {
    if (!gtag) return

    gtag('consent', 'update', {
      'analytics_storage': consent.value.analytics ? 'granted' : 'denied',
      'ad_storage': consent.value.marketing ? 'granted' : 'denied',
      'ad_user_data': consent.value.marketing ? 'granted' : 'denied',
      'ad_personalization': consent.value.marketing ? 'granted' : 'denied'
    })
  }

  /**
   * Generic tracking with GA4 standard or custom events
   * @param eventName - GA4 standard event name (generate_lead, sign_up, purchase, etc.) or custom
   * @param parameters - Event parameters including value, currency, etc.
   */
  const track = (eventName: string, parameters?: Record<string, unknown>) => {
    return
    // if (!gtag) return

    // const { locale, t } = useI18n()

    // // Check consent before tracking - NO events are exempt from consent
    // if (!consent.value.analytics) {
    //   if (import.meta.dev) {
    //     console.log(`[GA4] Event blocked (no consent): ${eventName}`)
    //   }
    //   return
    // }

    // // Always add context (check window exists for SSR safety)
    // const enrichedParams = {
    //   page_path: route.path,
    //   page_location: typeof window !== 'undefined' ? window.location.href : '',
    //   locale: locale.value,
    //   ...parameters
    // }

    // // Add currency for conversion events if not provided
    // if (['generate_lead', 'sign_up', 'purchase', 'begin_checkout'].includes(eventName)) {
    //   if (!parameters?.currency) {
    //     Object.assign(enrichedParams, { currency: t('common.currency') })
    //   }
    // }

    // // Debug logging in development
    // if (import.meta.dev) {
    //   console.log(`[GA4] ${eventName}:`, enrichedParams)
    // }

    // // Safe gtag call with error boundary
    // try {
    //   gtag('event', eventName, enrichedParams)
    // } catch (error) {
    //   console.warn('[GA4] Failed to send event:', error)
    // }
  }

  /**
   * Enhanced page view with business context
   * Uses GA4 standard 'page_view' event with custom parameters
   */
  const trackPage = () => {
    const getPageCategory = () => {
      // Use route.name which is locale-agnostic in Nuxt i18n
      const routeName = route.name?.toString() || ''

      // Route names in Nuxt i18n are like 'pricing___me', 'pricing___rs', or just 'pricing'
      const baseName = routeName.split('___')[0]

      // Special case: index -> home
      if (baseName === 'index') return 'home'

      // Return the base name for everything else
      return baseName || 'other'
    }

    track('page_view', {
      page_title: typeof document !== 'undefined' ? document.title : '',
      page_category: getPageCategory(),
      user_type: useCookie('user_type').value || 'visitor'
    })
  }

  return {
    track,
    trackPage,
    onUpdateConsent
  }
}
