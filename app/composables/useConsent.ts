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

  // Reactive consent state shared across the app
  const consent = useState<ConsentState>('consent.state', () => ({
    analytics: false,
    marketing: false,
    performance: false
  }))

  // Whether user has made any consent choice
  const consentGiven = useState<boolean>('consent.given', () => false)

  /**
   * Initialize consent from cookie on app load
   * Returns true if consent was previously given
   */
  const initializeConsent = (): boolean => {
    const cookie = useCookie<ConsentState>(COOKIE_NAME)

    if (cookie.value) {
      consent.value = cookie.value
      consentGiven.value = true
      return true
    }

    return false
  }

  /**
   * Update consent preferences and persist to cookie
   */
  const updateConsent = (preferences: ConsentState) => {
    consent.value = preferences

    // Persist to cookie
    const cookie = useCookie<ConsentState>(COOKIE_NAME, COOKIE_OPTIONS)
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
    initializeConsent,
    updateConsent
  }
}
