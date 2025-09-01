/**
 * Cloudflare Pages Function - Locale Redirect Middleware
 * 
 * Redirects users to their country-specific version of the site based on IP location.
 * Only redirects on specific pages (homepage, pricing, demo, product pages).
 * Respects manual country selection via cookie.
 */

interface LocaleCookie {
  locale: ValidLocale
  explicit: boolean  // true = user manually selected, false = auto-detected
}

type ValidLocale = 'me' | 'rs' | 'ba' | 'us'

const DEFAULT_LOCALE: ValidLocale = 'rs'  // Serbia is default (no URL prefix)
const VALID_LOCALES: ValidLocale[] = ['me', 'rs', 'ba', 'us']
const COUNTRY_TO_LOCALE_MAP: Record<string, ValidLocale> = {
  'ME': 'me',
  'RS': 'rs',
  'BA': 'ba',
  'US': 'us',
  // Fallback for neighboring countries
  'HR': 'ba',
  'SI': 'rs',
  'MK': 'rs',
  'AL': 'me',
  // English-speaking countries
  'GB': 'us',
  'CA': 'us',
  'AU': 'us',
  'NZ': 'us',
  'IE': 'us',
}

// Only these pages get redirected to locale URLs (have country-specific content)
const PAGES_TO_REDIRECT = [
  '/',
  '/pricing',
  '/demo',
  '/konty-retail',
  '/konty-hospitality'
]

// Never redirect these (universal content or system files)
const EXCLUDE_PATTERNS = [
  '/api/',
  '/_',
  '/blog',
  '/about',
  '/terms',
  '/privacy',
  '.xml',
  '.txt',
]

/**
 * Get locale preference from cookie
 */
function getLocaleCookie(request: Request): LocaleCookie | null {
  const cookieHeader = request.headers.get('Cookie')
  if (!cookieHeader) return null

  const cookies = parseCookies(cookieHeader)
  const cookieValue = cookies['konty-locale']
  if (!cookieValue) return null

  try {
    return JSON.parse(decodeURIComponent(cookieValue))
  } catch {
    return null
  }
}

/**
 * Parse cookie header into object
 */
function parseCookies(cookieHeader: string): Record<string, string> {
  const cookies: Record<string, string> = {}
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=')
    if (name && rest.length > 0) {
      cookies[name] = rest.join('=')
    }
  })
  return cookies
}

/**
 * Get country from Cloudflare headers
 */
function getCountryFromRequest(request: Request): string | null {
  return request.headers.get('cf-ipcountry') || null
}

/**
 * Convert country code to locale
 */
function countryToLocale(country: string | null): ValidLocale {
  if (!country) return DEFAULT_LOCALE
  return COUNTRY_TO_LOCALE_MAP[country.toUpperCase()] || DEFAULT_LOCALE
}

/**
 * Create cookie header value
 */
function createCookieHeader(locale: ValidLocale, explicit: boolean, hostname: string, existingExplicit?: boolean): string {
  const cookieValue = JSON.stringify({
    locale,
    explicit: existingExplicit !== undefined ? existingExplicit : explicit
  })
  
  const isProduction = !['localhost', '127.0.0.1'].some(host => hostname.includes(host))
  
  return `konty-locale=${encodeURIComponent(cookieValue)}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax${isProduction ? '; Secure' : ''}`
}

export const onRequest: PagesFunction = async ({ request, env, next }) => {
  const url = new URL(request.url)
  const path = url.pathname
  const method = request.method
  
  const isDev = env.CF_PAGES === '1' || url.hostname.includes('pages.dev')
  const log = (message: string, data?: unknown) => {
    if (isDev) {
      console.log(`[Locale Redirect CF] ${message}`, data ? JSON.stringify(data) : '')
    }
  }

  // === QUICK EXITS (no processing needed) ===
  
  if (method !== 'GET' && method !== 'HEAD') {
    return next()
  }

  for (const pattern of EXCLUDE_PATTERNS) {
    if (path.includes(pattern)) {
      return next()
    }
  }

  if (path.includes('.') && !path.endsWith('/')) {
    return next()
  }

  // === ALREADY ON LOCALE URL ===
  // User is on /me/*, /ba/*, or /us/* - don't redirect, just detect for banner
  const pathSegments = path.split('/').filter(Boolean)
  const firstSegment = pathSegments[0]

  if (firstSegment && VALID_LOCALES.includes(firstSegment as ValidLocale)) {
    const country = getCountryFromRequest(request)
    const detectedLocale = countryToLocale(country)

    // Pass detected locale to app for banner display
    const response = await next()
    const newResponse = new Response(response.body, response)
    
    newResponse.headers.set('x-detected-locale', detectedLocale)
    
    return newResponse
  }

  // === CHECK IF PAGE NEEDS LOCALIZATION ===
  
  if (!PAGES_TO_REDIRECT.includes(path)) {
    // Page has universal content, but still detect locale for consistency
    const country = getCountryFromRequest(request)
    const detectedLocale = countryToLocale(country)
    
    const response = await next()
    const newResponse = new Response(response.body, response)
    newResponse.headers.set('x-detected-locale', detectedLocale)
    return newResponse
  }

  // === REDIRECT LOGIC (for pages with locale-specific content) ===

  try {
    const cookie = getLocaleCookie(request)
    
    const country = getCountryFromRequest(request)
    const detectedLocale = countryToLocale(country)

    // Determine target locale: respect manual choice, otherwise use detected
    let targetLocale: ValidLocale
    if (cookie?.explicit) {
      targetLocale = cookie.locale  // User manually selected this locale
    } else {
      log('Auto-detecting locale', { country, detectedLocale, cookieLocale: cookie?.locale })
      targetLocale = detectedLocale  // Use fresh detection
    }

    // === HANDLE DEFAULT LOCALE (Serbia - no URL prefix needed) ===
    
    if (targetLocale === DEFAULT_LOCALE) {
      log('No redirect needed - already on default locale', { targetLocale })
      
      // Update cookie if needed
      if (!cookie || cookie.locale !== targetLocale) {
        const response = await next()
        const newResponse = new Response(response.body, response)
        newResponse.headers.append('Set-Cookie', createCookieHeader(
          targetLocale,
          false,
          url.hostname,
          cookie?.explicit
        ))
        newResponse.headers.set('x-detected-locale', detectedLocale)
        return newResponse
      }
      
      const response = await next()
      const newResponse = new Response(response.body, response)
      newResponse.headers.set('x-detected-locale', detectedLocale)
      return newResponse
    }

    // === REDIRECT TO LOCALE URL ===
    // Build: /locale/path (e.g., /me/pricing, /ba/demo)
    
    const targetPath = `/${targetLocale}${path === '/' ? '' : path}`
    const targetUrl = new URL(targetPath + url.search, url.origin)

    log('Redirecting to locale', { from: path, to: targetUrl.pathname, locale: targetLocale })
    
    const redirectResponse = new Response(null, {
      status: 302,
      headers: {
        'Location': targetUrl.toString(),
      }
    })

    // Update cookie if needed
    if (!cookie || cookie.locale !== targetLocale) {
      redirectResponse.headers.append('Set-Cookie', createCookieHeader(
        targetLocale,
        false,
        url.hostname,
        cookie?.explicit
      ))
    }

    redirectResponse.headers.set('x-detected-locale', detectedLocale)

    return redirectResponse

  } catch (error) {
    console.error('[Locale Redirect CF]', error)
    return next()  // On error, pass through without redirect
  }
}