/**
 * Google Tag Manager TypeScript definitions for Nuxt 4
 */

// Google Consent Mode v2 standard fields
export interface GTMConsentEvent {
  event: 'consent_default' | 'consent_update'
  'analytics_storage': 'granted' | 'denied'
  'ad_storage': 'granted' | 'denied'
  'ad_user_data': 'granted' | 'denied'
  'ad_personalization': 'granted' | 'denied'
  'functionality_storage'?: 'granted' | 'denied'
  'security_storage'?: 'granted' | 'denied'
}

// Standard tracking event
export interface GTMTrackingEvent {
  event: string
  page_path?: string
  page_location?: string
  locale?: string
  [key: string]: unknown
}

// The GTM instance is provided by @saslavik/nuxt-gtm module
// We don't need to define it ourselves

declare global {
  interface Window {
    dataLayer?: Array<GTMConsentEvent | GTMTrackingEvent | Record<string, unknown>>
    google_tag_manager?: Record<string, unknown>
  }
}

export {}
