/**
 * Core Web Vitals tracking for Nuxt 4
 * Uses nuxt-gtag module properly
 */

export default defineNuxtPlugin(() => {
  // Skip in development
  if (import.meta.dev) return

  const { track } = useAnalytics()
  if (!track) return

  // Track Web Vitals
  const trackWebVitals = async () => {
    try {
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

      const sendMetric = (metric: { name: string; value: number; delta: number }) => {
        track(metric.name, {
          event_category: 'Web Vitals',
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_delta: metric.delta
        })
      }

      // Track all Core Web Vitals
      onCLS(sendMetric)
      onFCP(sendMetric)
      onLCP(sendMetric)
      onTTFB(sendMetric)
      onINP?.(sendMetric)
    } catch (error) {
      console.warn('[Web Vitals] Not available:', error)
    }
  }

  // Initialize when ready
  if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
      trackWebVitals()
    } else {
      window.addEventListener('load', trackWebVitals, { once: true })
    }
  }
})
