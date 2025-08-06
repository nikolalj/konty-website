export default defineNuxtPlugin(() => {
  const route = useRoute()

  // Google Analytics helper function using global gtag
  const trackEvent = (eventCategory: string, eventAction: string, eventLabel?: string, value?: number, customData?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventAction, {
        event_category: eventCategory,
        event_label: eventLabel,
        value: value,
        ...customData
      })
    }
  }

  // Initialize consent (this will be handled by the nuxt-gtag module)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('consent', 'default', {
      'analytics_storage': 'denied',
      'ad_storage': 'denied',
      'ad_user_data': 'denied',
      'ad_personalization': 'denied'
    })
  }

  // Provide tracking utilities
  return {
    provide: {
      track: {
        // Track conversion events
        conversion: (eventName: string, eventData?: Record<string, unknown>) => {
          trackEvent('Conversion', eventName, route.path, undefined, eventData)
        },

        // Track demo requests
        demoRequest: () => {
          trackEvent('Lead Generation', 'Demo Request', route.path, 1)
        },

        // Track contact form submissions
        contactForm: () => {
          trackEvent('Lead Generation', 'Contact Form', route.path, 1)
        },

        // Track CTA clicks
        ctaClick: (ctaName: string, ctaLocation: string) => {
          trackEvent('CTA', 'Click', `${ctaName} - ${ctaLocation}`)
        },

        // Track scroll depth
        scrollDepth: (percentage: number) => {
          if (percentage > 0 && percentage % 25 === 0) {
            trackEvent('Engagement', 'Scroll Depth', `${percentage}%`, percentage)
          }
        },

        // Track file downloads
        fileDownload: (fileName: string, fileType: string) => {
          trackEvent('File Download', fileType, fileName)
        },

        // Track external link clicks
        externalLink: (url: string) => {
          trackEvent('External Link', 'Click', url)
        }
      }
    }
  }
}) as unknown