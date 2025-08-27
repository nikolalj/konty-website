export default defineNuxtPlugin(() => {
  const { track } = useTracking()
  const { consent } = useConsent()

  let isInitialized = false

  const initializeWebVitals = async () => {
    if (isInitialized || !consent.value.performance) return

    try {
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

      const reportMetric = (metric: { name: string; value: number; rating?: string; delta: number }) => {
        if (!consent.value.performance) return

        track('web_vitals', {
          metric_name: metric.name,
          metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating || 'unknown',
          metric_delta: Math.round(metric.delta)
        })

        if (metric.rating === 'poor') {
          track('poor_web_vital', {
            metric_name: metric.name,
            metric_value: Math.round(metric.value)
          })
        }
      }

      onCLS(reportMetric)
      onFCP(reportMetric)
      onLCP(reportMetric)
      onTTFB(reportMetric)
      onINP(reportMetric)

      isInitialized = true

      if (import.meta.dev) {
        console.log('[Web Vitals] Initialized')
      }
    } catch (error) {
      console.warn('[Web Vitals] Failed to initialize:', error)
    }
  }

  // Initialize on page load if consent already given
  if (typeof window !== 'undefined' && typeof document !== 'undefined') {
    if (document.readyState === 'complete') {
      initializeWebVitals()
    } else {
      window.addEventListener('load', initializeWebVitals, { once: true })
    }

    // Listen for consent changes
    window.addEventListener('consent:updated', initializeWebVitals)
  }
})
