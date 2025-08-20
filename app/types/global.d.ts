export {};

type GtagEventParams = {
  event_category?: string
  event_label?: string
  event_callback?: () => void
  value?: number | string
  [key: string]: string | number | boolean | object | undefined | (() => void)
}

type GtagConfigParams = {
  send_page_view?: boolean
  cookie_flags?: string
  [key: string]: string | number | boolean | object | undefined
}

type GtagConsentParams = {
  ad_storage?: 'granted' | 'denied'
  ad_user_data?: 'granted' | 'denied'
  ad_personalization?: 'granted' | 'denied'
  analytics_storage?: 'granted' | 'denied'
  functionality_storage?: 'granted' | 'denied'
  personalization_storage?: 'granted' | 'denied'
  security_storage?: 'granted' | 'denied'
  wait_for_update?: number
  region?: string[]
}

type GtagSetParams = {
  url_passthrough?: boolean
  ads_data_redaction?: boolean
  [key: string]: string | number | boolean | object | undefined
}

// Facebook Pixel types
type FbqConsentAction = 'grant' | 'revoke'
type FbqEventName = 'PageView' | 'ViewContent' | 'Search' | 'AddToCart' | 'InitiateCheckout' | 'Purchase' | 'Lead' | 'CompleteRegistration'

interface FbqParams {
  value?: number
  currency?: string
  content_type?: string
  content_ids?: string[]
  [key: string]: string | number | boolean | string[] | undefined
}

// Global type declarations
declare global {
  interface Window {
    dataLayer: Array<{
      event?: string
      [key: string]: unknown
    }>
    gtag: {
      (command: 'config', targetId: string, config?: GtagConfigParams): void
      (command: 'event', eventName: string, eventParams?: GtagEventParams): void
      (command: 'consent', action: 'default' | 'update', params: GtagConsentParams): void
      (command: 'set', params: GtagSetParams): void
      (command: 'js', date: Date): void
    }
    fbq: {
      (command: 'init', pixelId: string): void
      (command: 'track', event: FbqEventName, params?: FbqParams): void
      (command: 'trackCustom', event: string, params?: FbqParams): void
      (command: 'consent', action: FbqConsentAction): void
      callMethod?: (...args: unknown[]) => void
      queue?: unknown[]
    }
  }
}
