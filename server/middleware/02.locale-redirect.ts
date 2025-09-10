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
  if (!country) return DEFAULT_LOCALE.code
  return COUNTRY_TO_LOCALE_MAP[country.toUpperCase()] || DEFAULT_LOCALE.code
}

// Patterns to NEVER redirect (order matters for performance)
// Everything else gets locale redirects automatically
const EXCLUDE_PATTERNS = [
  '/api/',              // API routes
  '/_',                 // Nuxt internals (_nuxt, _ipx, etc)
  '.xml',               // Sitemaps
  '.txt',               // Robots, etc
  '.json',              // JSON
]

/**
 * Smart locale redirect middleware
 * Redirects visitors to their locale version for conversion-critical pages
 */
export default defineEventHandler(async (event: H3Event) => {
  const startTime = Date.now()
  const path = event.path || ''
  const query = getQuery(event)

  console.log(`[Locale] START processing ${path} at ${new Date().toISOString()}`)

  // 1. EXCLUSIONS - Quick exits for non-applicable requests

  // Skip non-GET requests (forms, API calls)
  if (event.method !== 'GET' && event.method !== 'HEAD') {
    console.log(`[Locale] Skipped non-GET: ${event.method} ${path} - ${Date.now() - startTime}ms`)
    return
  }

  // Skip excluded patterns
  const beforeExclude = Date.now()
  for (const pattern of EXCLUDE_PATTERNS) {
    if (path.includes(pattern)) {
      console.log(`[Locale] Excluded pattern '${pattern}': ${path} - ${Date.now() - startTime}ms`)
      return
    }
  }
  console.log(`[Locale] Pattern check: ${Date.now() - beforeExclude}ms`)

  // Skip static files (.css, .js, .jpg, etc)
  if (path.includes('.') && !path.endsWith('/')) {
    console.log(`[Locale] Static file: ${path} - ${Date.now() - startTime}ms`)
    return
  }

  // If on a localized path do not redirect (/me/*, /ba/*, /us/*)
  // just inform user in case his detected locale is different than this one
  const beforeSegment = Date.now()
  const pathSegments = path.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]
  console.log(`[Locale] Path segment parse: ${Date.now() - beforeSegment}ms`)

  const beforeCookie = Date.now()
  const cookie = getLocaleCookie(event)
  console.log(`[Locale] Cookie parse: ${Date.now() - beforeCookie}ms`)

  const beforeCountry = Date.now()
  const country = getCountryFromHeaders(event)
  console.log(`[Locale] Country header: ${Date.now() - beforeCountry}ms`)

  const beforeDetect = Date.now()
  const detectedLocale = countryToLocale(country)
  event.context.detectedLocale = detectedLocale
  console.log(`[Locale] Locale detection: ${Date.now() - beforeDetect}ms`)

  if (firstSegment && VALID_LOCALES.includes(firstSegment as ValidLocale)) {
    console.log(`[Locale] Already localized: ${path} - Total: ${Date.now() - startTime}ms`)
    return
  }

  // 2. REDIRECT LOGIC - All non-excluded pages get locale redirects

  try {
    const beforeLocaleLogic = Date.now()

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

    console.log(`[Locale] Locale logic: ${Date.now() - beforeLocaleLogic}ms`)

    // 4. SET COOKIE & REDIRECT

    // Only update cookie if it's a new detection or locale changed
    // Preserve explicit flag if user has made a choice
    const beforeSetCookie = Date.now()
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
      console.log(`[Locale] Cookie set: ${Date.now() - beforeSetCookie}ms`)
    }

    // Only redirect if not default locale
    if (targetLocale === DEFAULT_LOCALE.code) {
      console.log(`[Locale] Default locale, no redirect: ${path} - Total: ${Date.now() - startTime}ms`)
      return
    }

    // 5. BUILD TARGET URL - Preserve query params
    const beforeBuildUrl = Date.now()
    const queryString = new URLSearchParams(query as Record<string, string>).toString()
    const targetPath = `/${targetLocale}${path === '/' ? '' : path}`
    const targetUrl = queryString ? `${targetPath}?${queryString}` : targetPath
    console.log(`[Locale] URL build: ${Date.now() - beforeBuildUrl}ms`)

    console.log(`[Locale] REDIRECTING to ${targetUrl} - Total: ${Date.now() - startTime}ms`)
    return sendRedirect(event, targetUrl, 302)

  } catch (error) {
    // Error handling: If anything fails, don't break the site
    console.error('[Locale Redirect]', error)
    console.log(`[Locale] ERROR handled - Total: ${Date.now() - startTime}ms`)
    return
  } finally {
    console.log(`[Locale] END processing ${path} - Total: ${Date.now() - startTime}ms at ${new Date().toISOString()}`)
  }
})
