import type { H3Event } from 'h3'
import type { LocaleCookie, ValidLocale } from '~/types/locale'
import { DEFAULT_LOCALE, VALID_LOCALES, COUNTRY_TO_LOCALE_MAP } from '../../config/locale.config'

/**
 * Get locale preference from cookie
 */
function getLocaleCookie(event: H3Event): LocaleCookie | null {
  const cookieValue = getCookie(event, 'konty-locale')
  if (!cookieValue) return null

  try {
    return JSON.parse(cookieValue)
  } catch {
    return null
  }
}

/**
 * Get country from Cloudflare headers
 */
function getCountryFromHeaders(event: H3Event): string | null {
  return getHeader(event, 'cf-ipcountry') || null
}

/**
 * Convert country code to locale
 */
function countryToLocale(country: string | null): ValidLocale {
  if (!country) return DEFAULT_LOCALE
  return COUNTRY_TO_LOCALE_MAP[country.toUpperCase()] || DEFAULT_LOCALE
}

// All pages are localized and should redirect to locale-specific URLs
const PAGES_TO_REDIRECT = [
  '/',                  // Homepage
  '/pricing',           // Pricing with local currency
  '/demo',              // Demo request
  '/konty-retail',      // Retail product page
  '/konty-hospitality', // Hospitality product page
  '/products',          // Products overview
  '/about',             // About page
  '/terms',             // Terms of service
  '/privacy'            // Privacy policy
]

// Patterns to NEVER redirect (order matters for performance)
const EXCLUDE_PATTERNS = [
  '/api/',              // API routes
  '/_',                 // Nuxt internals (_nuxt, _ipx, etc)
  '/blog',              // Universal content
  '/about',             // Company info same everywhere
  '/terms',             // Legal pages
  '/privacy',           // Legal pages
  '.xml',               // Sitemaps
  '.txt',               // Robots, etc
]

/**
 * Smart locale redirect middleware
 * Redirects visitors to their locale version for conversion-critical pages
 */
export default defineEventHandler(async (event: H3Event) => {
  const path = event.path || ''
  const query = getQuery(event)

  // 1. EXCLUSIONS - Quick exits for non-applicable requests

  // Skip non-GET requests (forms, API calls)
  if (event.method !== 'GET' && event.method !== 'HEAD') return

  // Skip excluded patterns
  for (const pattern of EXCLUDE_PATTERNS) {
    if (path.includes(pattern)) return
  }

  // Skip static files (.css, .js, .jpg, etc)
  if (path.includes('.') && !path.endsWith('/')) return

  // If on a localized path do not redirect (/me/*, /ba/*, /us/*)
  // just inform user in case his detected locale is different than this one
  const pathSegments = path.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  const cookie = getLocaleCookie(event)
  const country = getCountryFromHeaders(event)
  const detectedLocale = countryToLocale(country)
  event.context.detectedLocale = detectedLocale

  if (firstSegment && VALID_LOCALES.includes(firstSegment as ValidLocale)) {
    return
  }

  // 2. INCLUSIONS - Only redirect if page needs localization

  if (!PAGES_TO_REDIRECT.includes(path)) return

  // 3. REDIRECT LOGIC - Determine if redirect needed

  try {
    // Determine which locale to use
    let targetLocale: ValidLocale

    // If user made explicit choice respect it, otherwise use detectedLocale
    if (cookie?.explicit) {
      targetLocale = cookie.locale
    } else {
      targetLocale = detectedLocale

      if (cookie?.locale && cookie.locale !== detectedLocale) {
        event.context.previousLocale = cookie.locale
      }
    }

    // 4. SET COOKIE & REDIRECT

    // Only update cookie if it's a new detection or locale changed
    // Preserve explicit flag if user has made a choice
    if (!cookie || cookie.locale !== targetLocale) {
      setCookie(event, 'konty-locale', JSON.stringify({
        locale: targetLocale,
        explicit: cookie?.explicit || false
      }), {
        httpOnly: false,
        secure: !import.meta.dev,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365  // 1 year
      })
    }

    // Only redirect if not default locale
    if (targetLocale === DEFAULT_LOCALE) return

    // 5. BUILD TARGET URL - Preserve query params

    const queryString = new URLSearchParams(query as Record<string, string>).toString()
    const targetPath = `/${targetLocale}${path === '/' ? '' : path}`
    const targetUrl = queryString ? `${targetPath}?${queryString}` : targetPath

    return sendRedirect(event, targetUrl, 302)

  } catch (error) {
    // Error handling: If anything fails, don't break the site
    console.error('[Locale Redirect]', error)
    return
  }
})
