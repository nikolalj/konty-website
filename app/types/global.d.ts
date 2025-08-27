export {};

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
