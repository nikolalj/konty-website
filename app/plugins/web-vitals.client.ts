export default defineNuxtPlugin(() => {
  // Only run in production and if analytics is configured
  const config = useRuntimeConfig()

  if (import.meta.dev || !config.public.googleAnalyticsId || config.public.googleAnalyticsId === 'GA_MEASUREMENT_ID') {
    return
  }

  // Web Vitals tracking
  const sendToAnalytics = (metric: { name: string; value: number; id: string; delta: number }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        event_label: metric.id,
        non_interaction: true,
        custom_map: {
          metric_value: metric.value,
          metric_delta: metric.delta,
          metric_id: metric.id
        }
      })
    }
  }

  // Import and use web-vitals library
  const trackWebVitals = async () => {
    try {
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

      // Track all Core Web Vitals
      onCLS(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)

      // Track Interaction to Next Paint (replaces FID)
      if (onINP) {
        onINP(sendToAnalytics)
      }
    } catch (error) {
      console.warn('Web Vitals library not available:', error)
    }
  }

  // Initialize tracking when the page is interactive
  if (typeof window !== 'undefined') {
    if (document.readyState === 'complete') {
      trackWebVitals()
    } else {
      window.addEventListener('load', trackWebVitals)
    }
  }

  // Performance observer for additional metrics
  if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
    try {
      // Track Long Tasks
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (window.gtag) {
            window.gtag('event', 'long_task', {
              event_category: 'Performance',
              value: Math.round(entry.duration),
              event_label: entry.name,
              non_interaction: true
            })
          }
        })
      })
      longTaskObserver.observe({ entryTypes: ['longtask'] })

      // Track Navigation Timing
      const navigationObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            const nav = entry as PerformanceNavigationTiming

            if (window.gtag) {
              // DNS lookup time
              window.gtag('event', 'dns_lookup', {
                event_category: 'Performance',
                value: Math.round(nav.domainLookupEnd - nav.domainLookupStart),
                non_interaction: true
              })

              // Connection time
              window.gtag('event', 'connection_time', {
                event_category: 'Performance',
                value: Math.round(nav.connectEnd - nav.connectStart),
                non_interaction: true
              })

              // Server response time
              window.gtag('event', 'server_response', {
                event_category: 'Performance',
                value: Math.round(nav.responseEnd - nav.requestStart),
                non_interaction: true
              })

              // DOM content loaded
              window.gtag('event', 'dom_content_loaded', {
                event_category: 'Performance',
                value: Math.round(nav.domContentLoadedEventEnd - nav.loadEventStart),
                non_interaction: true
              })
            }
          }
        })
      })
      navigationObserver.observe({ entryTypes: ['navigation'] })

    } catch (error) {
      console.warn('Performance Observer not fully supported:', error)
    }
  }
})
