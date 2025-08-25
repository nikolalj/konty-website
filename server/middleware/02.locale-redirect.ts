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
 * Adapts when location changes (travel, VPN) unless manually overridden
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

  // Skip if already on a localized path (/me/*, /ba/*, /us/*)
  const pathSegments = path.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  if (firstSegment && VALID_LOCALES.includes(firstSegment as ValidLocale)) {
    // Already localized - skip detection if user has explicit choice
    const cookie = getLocaleCookie(event)
    if (cookie?.explicit) return // User made a choice, respect it
    
    // Only detect for banner if no explicit choice (might have traveled)
    try {
      const { locale: detectedLocale } = await detectUserLocale(event)
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
    if(cookie?.explicit) return

    const { locale: detectedLocale } = await detectUserLocale(event)

    // Store for SSR context (banner component uses this)
    event.context.detectedLocale = detectedLocale

    // Redirect if:
    // - No cookie (first visit)
    // - OR cookie not explicit AND location changed
    const shouldRedirect = !cookie || cookie.locale !== detectedLocale

    if (!shouldRedirect) return

    // Don't redirect default locale to itself
    if (path === '/' && detectedLocale === DEFAULT_LOCALE) return

    // 4. BUILD TARGET URL - Preserve query params

    const queryString = new URLSearchParams(query as Record<string, string>).toString()
    const targetPath = detectedLocale === DEFAULT_LOCALE
      ? path
      : `/${detectedLocale}${path === '/' ? '' : path}`
    const targetUrl = queryString ? `${targetPath}?${queryString}` : targetPath

    // 5. SET COOKIE & REDIRECT

    setCookie(event, 'konty-locale', JSON.stringify({
      locale: detectedLocale,
      explicit: false,      // Auto-detected, not user choice
      wasRedirected: true   // Trigger banner notification
    }), {
      httpOnly: false,
      secure: !import.meta.dev,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365  // 1 year
    })

    return sendRedirect(event, targetUrl, 302)

  } catch (error) {
    // Error handling: If anything fails, don't break the site
    console.error('[Locale Redirect]', error)
    return  // Serve the requested page without redirect
  }
})
