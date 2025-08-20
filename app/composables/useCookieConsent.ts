// composables/useCookieConsent.ts
export const useCookieConsent = () => {
  const getCookieValue = (name: string): string | null => {
    if (!process.client) return null

    const nameEQ = `${name}=`
    const ca = document.cookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') c = c.substring(1, c.length)
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
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
