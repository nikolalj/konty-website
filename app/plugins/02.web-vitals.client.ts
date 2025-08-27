/**
 * Web Vitals tracking for Core Web Vitals metrics
 * Sends performance data to GA4 for conversion correlation
 */

export default defineNuxtPlugin(() => {
  const { track } = useTracking()
  
  // Only load Web Vitals after page is ready
  if (typeof window !== 'undefined') {
    const loadWebVitals = async () => {
      try {
        const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')
        
        // Report metric to GA4
        const reportMetric = (metric: { name: string; value: number; rating?: string; delta: number }) => {
          track('web_vitals', {
            metric_name: metric.name,
            metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
            metric_rating: metric.rating || 'unknown',
            metric_delta: Math.round(metric.delta)
          })
          
          // Also send as custom event for poor metrics (impacts conversion)
          if (metric.rating === 'poor') {
            track('poor_web_vital', {
              metric_name: metric.name,
              metric_value: Math.round(metric.value)
            })
          }
        }
        
        // Track all Core Web Vitals
        onCLS(reportMetric)
        onFCP(reportMetric)
        onLCP(reportMetric)
        onTTFB(reportMetric)
        onINP(reportMetric)
      } catch (error) {
        console.warn('[Web Vitals] Failed to load:', error)
      }
    }
    
    // Load when page is ready
    if (document.readyState === 'complete') {
      loadWebVitals()
    } else {
      window.addEventListener('load', loadWebVitals, { once: true })
    }
  }
})