/**
 * Centralized consent management for GDPR compliance
 * Single source of truth for all tracking and third-party services
 */

interface ConsentState {
  analytics: boolean
  marketing: boolean
  functional: boolean
  performance: boolean
}

interface ConsentCookie {
  preferences: ConsentState
  timestamp: string
  version: string
}

export const useConsent = () => {
  // Cookie name and version for migrations
  const COOKIE_NAME = 'konty-consent'
  const CONSENT_VERSION = '1.0'
  
  // Reactive state shared across app
  const consentState = useState<ConsentState>('consent.state', () => ({
    analytics: false,
    marketing: false, 
    functional: true, // Always true - required for site
    performance: false
  }))
  
  // Track if consent has been given (to show/hide banner)
  const consentGiven = useState<boolean>('consent.given', () => false)
  
  // Initialize from cookie
  const initializeConsent = () => {
    const cookie = useCookie<ConsentCookie>(COOKIE_NAME)
    
    if (cookie.value?.preferences) {
      consentState.value = {
        ...consentState.value,
        ...cookie.value.preferences
      }
      consentGiven.value = true
      return true
    }
    return false
  }
  
  // Save consent to cookie
  const saveConsent = (preferences: Partial<ConsentState>) => {
    // Update state
    consentState.value = {
      ...consentState.value,
      ...preferences
    }
    
    // Save to cookie
    const cookie = useCookie<ConsentCookie>(COOKIE_NAME, {
      httpOnly: false, // Needs to be readable by client
      secure: true,
      sameSite: 'lax',
      maxAge: 365 * 24 * 60 * 60 // 1 year
    })
    
    cookie.value = {
      preferences: consentState.value,
      timestamp: new Date().toISOString(),
      version: CONSENT_VERSION
    }
    
    consentGiven.value = true
    
    // Emit event for services to react
    if (import.meta.client) {
      window.dispatchEvent(new CustomEvent('consent:updated', {
        detail: consentState.value
      }))
    }
  }
  
  // Convenience methods
  const acceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
      performance: true
    })
  }
  
  const acceptSelected = (preferences: Partial<ConsentState>) => {
    saveConsent(preferences)
  }
  
  const denyAll = () => {
    saveConsent({
      analytics: false,
      marketing: false,
      performance: false
    })
  }
  
  // Check specific consent
  const hasConsent = (type: keyof ConsentState) => {
    return computed(() => consentState.value[type])
  }
  
  return {
    // State
    consent: readonly(consentState),
    consentGiven: readonly(consentGiven),
    
    // Actions
    initializeConsent,
    acceptAll,
    acceptSelected,
    denyAll,
    
    // Helpers
    hasConsent,
    hasAnalytics: computed(() => consentState.value.analytics),
    hasMarketing: computed(() => consentState.value.marketing),
    hasPerformance: computed(() => consentState.value.performance)
  }
}