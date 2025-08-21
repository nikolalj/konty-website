// composables/useCookieConsent.ts
export const useCookieConsent = () => {
  const getCookieValue = (name: string): string | null => {
    if (!import.meta.client) return null

    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      if (!c) continue
      while (c.charAt(0) === ' ') c = c.substring(1)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length)
    }
    return null
  }

  const getConsent = () => {
    const consent = getCookieValue('cookie-consent')
    if (consent) {
      try {
        return JSON.parse(consent)
      } catch {
        return null
      }
    }
    return null
  }

  const hasAnalyticsConsent = () => {
    const consent = getConsent()
    return consent?.preferences?.analytics === true
  }

  const hasMarketingConsent = () => {
    const consent = getConsent()
    return consent?.preferences?.marketing === true
  }

  const hasPerformanceConsent = () => {
    const consent = getConsent()
    return consent?.preferences?.performance === true
  }

  return {
    getConsent,
    hasAnalyticsConsent,
    hasMarketingConsent,
    hasPerformanceConsent
  }
}
