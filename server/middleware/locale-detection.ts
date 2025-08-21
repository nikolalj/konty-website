import type { H3Event } from 'h3'

const COUNTRY_TO_LOCALE_MAP: Record<string, string> = {
  'ME': 'me',
  'RS': 'rs',
  'BA': 'ba',
  'US': 'us',
  // Fallback for neighboring countries
  'HR': 'ba',
  'SI': 'rs',
  'MK': 'rs',
  'AL': 'us',
  // English-speaking countries
  'GB': 'us',
  'CA': 'us',
  'AU': 'us',
}

const VALID_LOCALES = ['me', 'rs', 'ba', 'us']
const DEFAULT_LOCALE = 'rs'

async function detectCountryFromIP(_event: H3Event): Promise<string | null> {
  try {
    // Try to detect country from IP using the same services as the API
    try {
      const response = await $fetch<{country: string}>('https://api.country.is/', { timeout: 2000 })
      return response.country
    } catch {
      // Fallback to ipapi.co
      try {
        const response = await $fetch<{country_code: string}>('https://ipapi.co/json/', { timeout: 2000 })
        return response.country_code
      } catch {
        return null
      }
    }
  } catch {
    return null
  }
}

export default defineEventHandler(async (event) => {
  const url = event.path || ''

  // Skip processing for:
  // - API routes
  // - Static assets
  // - Nuxt internals
  // - Already localized paths
  if (url.startsWith('/api/') ||
      url.startsWith('/_nuxt/') ||
      url.startsWith('/__nuxt') ||
      url.includes('.') && !url.endsWith('/')) {
    return
  }

  // Check if URL already has a locale prefix
  const urlParts = url.split('/').filter(Boolean)
  const firstPart = urlParts[0]

  if (firstPart && VALID_LOCALES.includes(firstPart)) {
    // Already has a locale in URL, no need to redirect
    return
  }

  // Only process root and non-localized paths
  if (url !== '/' && !url.startsWith('/pricing') &&
      !url.startsWith('/demo') && !url.startsWith('/about') &&
      !url.startsWith('/konty-') && !url.startsWith('/products') &&
      !url.startsWith('/terms') && !url.startsWith('/privacy')) {
    return
  }

  // Check for saved locale cookie
  const savedLocale = getCookie(event, 'konty-locale')

  let targetLocale = DEFAULT_LOCALE

  if (savedLocale && VALID_LOCALES.includes(savedLocale)) {
    // User has a saved preference
    targetLocale = savedLocale
  } else {
    // No saved preference, detect from IP
    const countryCode = await detectCountryFromIP(event)

    if (countryCode && COUNTRY_TO_LOCALE_MAP[countryCode]) {
      targetLocale = COUNTRY_TO_LOCALE_MAP[countryCode]

      // Save the detected locale for future visits
      setCookie(event, 'konty-locale', targetLocale, {
        httpOnly: false,
        secure: import.meta.dev ? false : true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })
    }
  }

  // Don't redirect if already on default locale (to avoid redirect loops)
  if (targetLocale === DEFAULT_LOCALE) {
    return
  }

  // Build the redirect URL
  const redirectUrl = url === '/' ? `/${targetLocale}` : `/${targetLocale}${url}`

  // Perform the redirect
  return sendRedirect(event, redirectUrl, 302)
})
