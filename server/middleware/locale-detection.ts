import type { H3Event } from 'h3'
import { 
  detectCountryFromIP, 
  mapCountryToLocale, 
  parseLocalePreference,
  serializeLocalePreference,
  getEffectiveLocale,
  type LocalePreference
} from '../utils/country-detection'

const VALID_LOCALES = ['me', 'rs', 'ba', 'us'] as const
const DEFAULT_LOCALE = 'rs'

export default defineEventHandler(async (event: H3Event) => {
  const url = event.path || ''

  // Skip processing for API routes, static assets, and Nuxt internals
  if (url.startsWith('/api/') ||
      url.startsWith('/_nuxt/') ||
      url.startsWith('/__nuxt') ||
      (url.includes('.') && !url.endsWith('/'))) {
    return
  }

  // Extract locale from URL if present
  const urlParts = url.split('/').filter(Boolean)
  const firstPart = urlParts[0]
  const hasLocaleInUrl = firstPart && VALID_LOCALES.includes(firstPart as any)

  // Parse existing preference cookie
  const cookieValue = getCookie(event, 'konty-locale') || null
  let preference = parseLocalePreference(cookieValue)

  // If URL has explicit locale, handle it intelligently
  if (hasLocaleInUrl) {
    const urlLocale = firstPart as typeof VALID_LOCALES[number]
    
    // Detect country to understand user's actual location
    const detectedCountry = await detectCountryFromIP(event)
    const detectedLocale = mapCountryToLocale(detectedCountry)
    
    // Determine if this is an explicit choice or just following a link
    // It's only "manual" if:
    // 1. User already had a manual preference stored, OR
    // 2. User is viewing a locale different from their detected location
    const isExplicitChoice = 
      preference?.preference_type === 'manual' || 
      (preference?.explicit_locale === urlLocale && preference?.preference_type === 'manual')
    
    // For first-time visitors or those following links:
    // If URL locale matches their detected locale -> likely our redirect, don't show banner
    // If URL locale differs from detected -> likely shared link, should show banner
    const shouldTreatAsDetected = !isExplicitChoice && !preference?.explicit_locale
    
    if (!preference || preference.explicit_locale !== urlLocale || shouldTreatAsDetected) {
      preference = {
        explicit_locale: shouldTreatAsDetected ? undefined : urlLocale,
        detected_country: detectedCountry || undefined,
        detected_locale: detectedLocale,
        preference_type: isExplicitChoice ? 'manual' : 'detected',
        timestamp: new Date().toISOString()
      }
      
      // Only set cookie if preference changed
      setCookie(event, 'konty-locale', serializeLocalePreference(preference), {
        httpOnly: false,
        secure: !import.meta.dev,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
        encode: value => encodeURIComponent(value)
      })
    }
    
    // Store in context for SSR
    event.context.locale = urlLocale
    event.context.localePreference = preference
    
    // URL already has locale, continue normally
    return
  }

  // No locale in URL - need to determine what locale to serve
  // But we DON'T redirect anymore (except for root domain)
  
  // Detect country if we don't have a preference
  if (!preference || preference.preference_type === 'default') {
    const detectedCountry = await detectCountryFromIP(event)
    const detectedLocale = mapCountryToLocale(detectedCountry)
    
    // Create/update preference with detection
    preference = {
      detected_country: detectedCountry || undefined,
      detected_locale: detectedLocale,
      preference_type: 'detected',
      timestamp: new Date().toISOString(),
      // Preserve explicit choice if it exists
      explicit_locale: preference?.explicit_locale
    }
    
    // Save the detection for future visits
    setCookie(event, 'konty-locale', serializeLocalePreference(preference), {
      httpOnly: false,
      secure: !import.meta.dev,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      encode: value => encodeURIComponent(value)
    })
  }

  // Get the effective locale to serve
  const effectiveLocale = getEffectiveLocale(preference)

  // Set headers for the application layer to use
  // This tells Nuxt what locale to render
  setHeader(event, 'x-detected-locale', effectiveLocale)
  setHeader(event, 'x-detected-country', preference?.detected_country || '')
  setHeader(event, 'x-preference-type', preference?.preference_type || 'default')

  // ONLY redirect for root domain visits
  // This maintains clean URLs while avoiding redirect friction
  if (url === '/' && effectiveLocale !== DEFAULT_LOCALE) {
    // Root domain gets redirected to locale-specific homepage
    return sendRedirect(event, `/${effectiveLocale}`, 302)
  }

  // For all other URLs, serve content in detected/preferred locale
  // WITHOUT redirecting. The application will show a suggestion banner
  // if there's a mismatch between detected and current locale.
  
  // Store locale in event context for SSR
  event.context.locale = effectiveLocale
  event.context.localePreference = preference
})