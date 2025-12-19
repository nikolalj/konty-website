interface ConsentState {
  analytics: boolean
  marketing: boolean
  performance: boolean
}

export const useConsent = () => {
  const COOKIE_NAME = 'konty-consent'
  const COOKIE_OPTIONS = {
    httpOnly: false,
    sameSite: 'lax' as const,
    maxAge: 31536000, // 1 year
    path: '/'
  }

  // Read/write cookie (works on both server and client)
  const cookie = useCookie<ConsentState>(COOKIE_NAME, COOKIE_OPTIONS)

  // Initialize state - always start with defaults on server to avoid SSR cache issues
  // The actual cookie value will be read on client mount
  const consent = useState<ConsentState>('consent.state', () => ({
    analytics: false,
    marketing: false,
    performance: false
  }))

  // Whether user has made any consent choice - always false on server for consistent SSR
  const consentGiven = useState<boolean>('consent.given', () => false)

  // Sync state from cookie on client side only
  if (import.meta.client) {
    if (cookie.value) {
      consent.value = cookie.value
      consentGiven.value = true
    }
  }

  /**
   * Update consent preferences and persist to cookie
   */
  const updateConsent = (preferences: ConsentState) => {
    consent.value = preferences
    cookie.value = consent.value

    // Mark that user has made a choice
    consentGiven.value = true

    // Notify other parts of the app (tracking scripts, etc.)
    if (import.meta.client) {
      window.dispatchEvent(
        new CustomEvent('consent:updated', { detail: consent.value })
      )
    }
  }

  return {
    consentGiven: readonly(consentGiven),
    consent: readonly(consent),
    updateConsent
  }
}
