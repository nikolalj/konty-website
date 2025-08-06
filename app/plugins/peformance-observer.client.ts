// app/plugins/performance-observer.client.ts
export default defineNuxtPlugin(() => {
  // Only run in production
  if (import.meta.dev) return

  const route = useRoute()

  // Track Core Web Vitals
  const trackWebVitals = async () => {
    try {
      // Dynamically import web-vitals to reduce initial bundle
      const { onCLS, onFCP, onLCP, onTTFB, onINP } = await import('web-vitals')

      const sendToAnalytics = (metric: any) => {
        // Only send if gtag is available
        if (window.gtag) {
          window.gtag('event', metric.name, {
            event_category: 'Web Vitals',
            event_label: metric.id,
            value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
            metric_rating: metric.rating,
            page_path: route.path,
            non_interaction: true
          })
        }

        // Log to console in development
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating
        })
      }

      onCLS(sendToAnalytics)
      onFCP(sendToAnalytics)
      onLCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
      onINP(sendToAnalytics)

    } catch (error) {
      console.warn('Web Vitals not available:', error)
    }
  }

  // Track custom performance metrics
  const trackCustomMetrics = () => {
    // First Input Delay polyfill
    let firstHidden = false

    const onFirstHidden = () => {
      firstHidden = true
      document.removeEventListener('visibilitychange', onFirstHidden)
    }

    document.addEventListener('visibilitychange', onFirstHidden)

    // Track Time to Interactive
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'measure') {
          if (window.gtag) {
            window.gtag('event', 'custom_performance', {
              event_category: 'Performance',
              event_label: entry.name,
              value: Math.round(entry.duration),
              page_path: route.path
            })
          }
        }
      }
    })

    observer.observe({ entryTypes: ['measure'] })

    // Measure specific interactions
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.tagName === 'A') {
        performance.mark('interaction_start')

        requestAnimationFrame(() => {
          performance.mark('interaction_end')
          performance.measure('interaction_duration', 'interaction_start', 'interaction_end')
        })
      }
    })
  }

  // Initialize when ready
  if (document.readyState === 'complete') {
    trackWebVitals()
    trackCustomMetrics()
  } else {
    window.addEventListener('load', () => {
      trackWebVitals()
      trackCustomMetrics()
    })
  }
})
