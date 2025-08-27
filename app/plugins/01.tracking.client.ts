/**
 * Page and engagement tracking plugin
 * Handles automatic page views, scroll depth, and errors
 */

export default defineNuxtPlugin(() => {
  const { track, trackPage, updateConsentMode } = useTracking()
  const router = useRouter()
  
  // Initialize consent mode on first load
  updateConsentMode()
  
  // Track initial page view (critical fix!)
  onMounted(() => {
    trackPage()
  })
  
  // Track subsequent page views
  router.afterEach((to, from) => {
    if (from.name) {
      nextTick(() => trackPage())
    }
  })
  
  // Simple scroll tracking
  const depths = [25, 50, 75, 90]
  const reached = new Set<number>()
  let scrollTimer: ReturnType<typeof setTimeout>
  
  const checkScroll = () => {
    clearTimeout(scrollTimer)
    scrollTimer = setTimeout(() => {
      const percent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      
      depths.forEach(depth => {
        if (percent >= depth && !reached.has(depth)) {
          reached.add(depth)
          track('scroll', { percent: depth })
        }
      })
    }, 150)
  }
  
  // Reset on navigation
  router.afterEach(() => reached.clear())
  
  // Error tracking
  const trackError = (event: ErrorEvent) => {
    track('exception', {
      description: `${event.message} at ${event.filename}:${event.lineno}`,
      fatal: false
    })
  }
  
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('error', trackError)
    
    // Cleanup on unmount (fix memory leak!)
    onUnmounted(() => {
      clearTimeout(scrollTimer)
      window.removeEventListener('scroll', checkScroll)
      window.removeEventListener('error', trackError)
    })
  }
})