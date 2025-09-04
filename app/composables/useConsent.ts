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
    maxAge: 31536000 // 1 year
  }

  // Read/write cookie (works on both server and client)
  const cookie = useCookie<ConsentState>(COOKIE_NAME, COOKIE_OPTIONS)
  
  // Initialize state from cookie if exists, ensuring consistency between server and client
  const consent = useState<ConsentState>('consent.state', () => 
    cookie.value || {
      analytics: false,
      marketing: false,
      performance: false
    }
  )

  // Whether user has made any consent choice
  const consentGiven = useState<boolean>('consent.given', () => !!cookie.value)

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
