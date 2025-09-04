/**
 * Google Tag Manager TypeScript definitions for Nuxt 4
 */

export interface GTMConsentState {
  analytics_storage: 'granted' | 'denied'
  ad_storage: 'granted' | 'denied'
  ad_user_data: 'granted' | 'denied'
  ad_personalization: 'granted' | 'denied'
  functionality_storage?: 'granted' | 'denied'
  personalization_storage?: 'granted' | 'denied'
  security_storage?: 'granted' | 'denied'
  wait_for_update?: number
}

export interface GTMDataLayerEvent extends Record<string, unknown> {
  event: string
}

export interface GTMInstance {
  push(data: GTMDataLayerEvent | [string, string, unknown]): void
  enabled(): boolean
  enable(enable: boolean): void
}

declare module '#app' {
  interface NuxtApp {
    $gtm: GTMInstance
  }
}

declare global {
  interface Window {
    dataLayer?: Array<GTMDataLayerEvent | [string, string, unknown]>
    google_tag_manager?: Record<string, unknown>
  }
}

export {}