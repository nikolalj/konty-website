/**
 * Optimal Analytics Composable for Nuxt 4
 * Clean, minimal, intent-based tracking
 */
export const useAnalytics = () => {
  const { gtag } = useGtag() // From nuxt-gtag module

  // Only track if gtag is available
  if (!gtag) {
    // Return no-op functions if gtag isn't available
    return {
      track: () => {},
      demo: () => {},
      pricing: () => {},
      product: () => {},
      error: () => {},
      engagement: () => {}
    }
  }

  return {
    // Generic tracking method for custom events
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    track: (eventName: string, parameters?: Record<string, any>) => {
      gtag('event', eventName, parameters)
    },

    // Demo Intent (100-point events)
    demo: (action: 'view' | 'start' | 'submit', source?: string) => {
      const values = { view: 20, start: 50, submit: 100 }
      gtag('event', `demo_${action}`, {
        event_category: 'intent',
        event_label: source,
        value: values[action]
      })
    },

    // Pricing Interest (50-point events)
    pricing: (action: 'view' | 'interact' | 'calculate', tier?: string) => {
      const values = { view: 10, interact: 25, calculate: 50 }
      gtag('event', `pricing_${action}`, {
        event_category: 'intent',
        event_label: tier,
        value: values[action]
      })
    },

    // Product Qualification (25-point events)
    product: (product: 'retail' | 'hospitality', depth: 'view' | 'explore') => {
      const values = { view: 10, explore: 25 }
      gtag('event', `product_${depth}`, {
        event_category: 'qualification',
        event_label: product,
        value: values[depth]
      })
    },

    // Error Tracking (negative points for friction)
    error: (code: number) => {
      gtag('event', 'error', {
        event_category: 'friction',
        event_label: `${code}`,
        value: -1
      })
    },

    // Engagement Tracking (quality indicator)
    engagement: (seconds: number) => {
      if (seconds < 10) return // Ignore bounces

      const quality = seconds > 60 ? 'high' : seconds > 30 ? 'medium' : 'low'
      gtag('event', 'engagement', {
        event_category: 'quality',
        event_label: quality,
        value: Math.min(seconds, 300)
      })
    }
  }
}
