/**
 * Simplified Analytics Plugin for Nuxt 4
 * Handles automatic page tracking and performance metrics
 */

export default defineNuxtPlugin(() => {
  // Skip in development
  if (import.meta.dev) return

  const { track, engagement } = useAnalytics()
  if (!track) return

  // Auto-track page engagement time
  let pageStartTime = Date.now()
  
  const router = useRouter()
  
  // Track engagement when leaving page
  router.beforeEach(() => {
    const seconds = Math.round((Date.now() - pageStartTime) / 1000)
    
    // Track meaningful engagement
    if (seconds >= 10) { // Only track meaningful engagement
      engagement(seconds)
    }
    
    // Reset timer for next page
    pageStartTime = Date.now()
  })

  // Track client-side errors
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      track('javascript_error', {
        event_category: 'technical',
        description: `${event.message} at ${event.filename}:${event.lineno}`,
        fatal: true
      })
    })

    window.addEventListener('unhandledrejection', (event) => {
      track('promise_rejection', {
        event_category: 'technical',
        description: `${event.reason}`,
        fatal: false
      })
    })
  }
})