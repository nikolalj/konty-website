/**
 * TypeScript definitions for tracking
 */

// GA4 Standard event names for better type safety
export type GA4StandardEvent =
  | 'add_payment_info'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'exception'
  | 'generate_lead'
  | 'login'
  | 'page_view'
  | 'purchase'
  | 'scroll'
  | 'search'
  | 'sign_up'
  | 'view_item'
  | 'view_item_list'

// Custom events specific to Konty
export type KontyCustomEvent =
  | 'cta_click'
  | 'form_interaction'
  | 'poor_web_vital'
  | 'web_vitals'

// All trackable events
export type TrackableEvent = GA4StandardEvent | KontyCustomEvent | string

// Tracking composable return type
export interface UseTrackingReturn {
  track: (eventName: TrackableEvent, parameters?: Record<string, unknown>) => void
  trackPage: () => void
}

declare module '#app' {
  interface NuxtApp {
    $tracking: UseTrackingReturn
  }
}
