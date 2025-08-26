import type { H3Event } from 'h3'
import type { ValidLocale } from '~/types/locale'
import { DEFAULT_LOCALE, VALID_LOCALES } from '../../config/locale.config'
import { detectUserLocale, getLocaleCookie } from '../utils/country-detection'

// Pages that need locale-specific content (prices, language)
const PAGES_TO_REDIRECT = [
  '/',                  // Homepage - testimonials, CTAs
  '/pricing',           // Different prices per country
  '/demo',              // Contact info, business hours
  '/konty-retail',      // Product features, local examples
  '/konty-hospitality'  // Product features, local examples
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

  if (firstSegment && VALID_LOCALES.includes(firstSegment as ValidLocale)) {
    const cookie = getLocaleCookie(event)

    // If user made explicit choice we don't care about detected locale
    if (cookie?.explicit) {
      event.context.detectedLocale = undefined
      return
    }

    // If no explicit choice detect locale and if different inform the user
    try {
      let { locale: detectedLocale } = await detectUserLocale(event)
      detectedLocale = VALID_LOCALES.includes(detectedLocale) ? detectedLocale : DEFAULT_LOCALE

      event.context.detectedLocale = detectedLocale
    } catch {
      // Silently ignore detection errors on localized paths
    }

    return
  }

  // 2. INCLUSIONS - Only redirect if page needs localization

  if (!PAGES_TO_REDIRECT.includes(path)) return

  // 3. REDIRECT LOGIC - Determine if redirect needed

  try {
    // Get current state
    const cookie = getLocaleCookie(event)

    // Determine which locale to use
    let targetLocale: ValidLocale

    if (cookie?.explicit) {
      // If user made explicit choice respect it, don't care about detected locale
      targetLocale = cookie.locale
      event.context.detectedLocale = undefined
    } else {
      // Auto-detect locale
      let { locale: detectedLocale } = await detectUserLocale(event)
      detectedLocale = VALID_LOCALES.includes(detectedLocale) ? detectedLocale : DEFAULT_LOCALE

      // Store for SSR context
      event.context.detectedLocale = detectedLocale

      // Use cookie locale if exists (and not explicit), otherwise use detected
      targetLocale = detectedLocale

      // If different from saved, we might show a suggestion to switch back                                                                           │ │
      if (cookie?.locale && cookie.locale !== detectedLocale) {                                                                                       │ │
        event.context.previousLocale = cookie.locale                                                                                                  │ │
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
