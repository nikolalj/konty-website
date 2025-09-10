/**
 * Central tracking orchestrator plugin
 * Manages consent mode initialization, page tracking, and engagement metrics
 */

export default defineNuxtPlugin((nuxtApp) => {
  // Import only what we need
  const { consentGiven } = useConsent()
  const { track, trackPage, onUpdateConsent } = useTracking()
  const router = useRouter()

  // ============================================
  // STEP 1: CONSENT MODE INITIALIZATION
  // ============================================

  // Set DEFAULT consent mode before ANY tracking
  // Push consent defaults to GTM dataLayer using Google's standard fields
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event: 'consent_default',
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied',
      'functionality_storage': 'granted',
      'security_storage': 'granted',
      'wait_for_update': 500
    })

    if (import.meta.dev) {
      console.log('[Tracking] Default consent mode set to denied')
    }
  }

  // If user has previously given consent, apply it immediately
  if (consentGiven.value) {
    onUpdateConsent()
    if (import.meta.dev) {
      console.log('[Tracking] Applied saved consent preferences')
    }
  }

  // Listen for future consent changes
  if (typeof window !== 'undefined') {
    window.addEventListener('consent:updated', () => {
      onUpdateConsent()
      if (import.meta.dev) {
        console.log('[Tracking] Consent preferences updated')
      }
    })
  }

  // ============================================
  // STEP 2: DEFERRED GTM LOADING
  // ============================================

  // Load GTM after all critical resources are loaded for optimal performance
  if (typeof window !== 'undefined') {
    const loadGTM = async () => {
      const gtmConfig = useRuntimeConfig().public.gtm
      const gtmId = gtmConfig?.id

      if (gtmId && typeof gtmId === 'string' && !document.querySelector(`script[src*="${gtmId}"]`)) {
        // Dynamically import the loadScript function from @gtm-support/core
        try {
          const { loadScript } = await import('@gtm-support/core')
          // Use minimal options for loading - just the GTM ID is required
          setTimeout(() => {
            loadScript(gtmId, {
              defer: false,
              compatibility: false
            })
          }, 5000)
          if (import.meta.dev) {
            console.log('[Tracking] GTM loaded after window.load')
          }
        } catch (error) {
          console.error('[Tracking] Failed to load GTM:', error)
        }
      }
    }

    // Load GTM after window.load event
    if (document.readyState === 'complete') {
      // If page already loaded, defer to next tick
      setTimeout(loadGTM, 0)
    } else {
      // Wait for window.load event
      window.addEventListener('load', loadGTM, { once: true })
    }
  }

  // ============================================
  // STEP 3: PAGE VIEW TRACKING
  // ============================================

  // Track initial page view when app is ready
  nuxtApp.hook('app:mounted', () => {
    trackPage()
    if (import.meta.dev) {
      console.log('[Tracking] Initial page view tracked')
    }
  })

  // Track subsequent navigation (SPA route changes)
  router.afterEach((to, from) => {
    // Only track if navigating from another page (not initial load)
    if (from.name) {
      // Use nextTick to ensure DOM is updated with new page content
      nextTick(() => {
        trackPage()
      })
    }
  })

  // ============================================
  // STEP 4: SCROLL DEPTH TRACKING
  // ============================================

  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    const scrollDepths = [25, 50, 75, 90]
    const reachedDepths = new Set<number>()
    let scrollTimer: NodeJS.Timeout | undefined

    const trackScrollDepth = () => {
      // Debounce scroll events for performance
      clearTimeout(scrollTimer)

      scrollTimer = setTimeout(() => {
        // Calculate scroll percentage
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.scrollHeight
        const scrollTop = window.scrollY

        // Avoid division by zero
        const scrollableHeight = documentHeight - windowHeight
        if (scrollableHeight <= 0) return

        const scrollPercent = Math.round((scrollTop / scrollableHeight) * 100)

        // Track each depth milestone once per page
        scrollDepths.forEach(depth => {
          if (scrollPercent >= depth && !reachedDepths.has(depth)) {
            reachedDepths.add(depth)
            track('scroll', {
              percent: depth,
              page_path: router.currentRoute.value.path
            })
          }
        })
      }, 150) // Debounce delay
    }

    // Reset scroll tracking on navigation
    router.afterEach(() => {
      reachedDepths.clear()
      if (import.meta.dev) {
        console.log('[Tracking] Scroll depth tracking reset for new page')
      }
    })

    // Start listening to scroll events
    window.addEventListener('scroll', trackScrollDepth, { passive: true })
  }

  // ============================================
  // STEP 5: ERROR TRACKING
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
