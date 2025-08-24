import type { LocaleConfig } from "~/types/locale"
import { DEFAULT_LOCALE, VALID_LOCALES } from "../../config/locale.config"

interface SeoMetaOptions {
  title: string
  description: string
  image?: string            // Optional explicit OG image
  type?: 'website' | 'article' | 'book' | 'profile'
  url?: string              // Optional canonical override
  robots?: string           // Optional robots override per page
  noindex?: boolean         // Convenience flag to noindex a page
}

/**
 * Get all locale variants of the current URL
 * Useful for generating alternate links in structured data
 */
export function getAllLocaleUrls(path: string, siteUrl?: string): Record<string, string> {
  const baseUrl = siteUrl || 'https://konty.com'
  const urls: Record<string, string> = {}
  
  // Remove any existing locale prefix
  const cleanPath = path.replace(/^\/(me|ba|us)/, '') || '/'
  
  VALID_LOCALES.forEach(locale => {
    const localePath = locale === DEFAULT_LOCALE 
      ? cleanPath 
      : `/${locale}${cleanPath}`
    urls[locale] = `${baseUrl}${localePath}`
  })
  
  return urls
}

/**
 * Generate hreflang tags for all available locales
 * Following Google's best practices for international SEO
 */
function generateHreflangTags(
  currentPath: string, 
  locales: LocaleConfig[], 
  currentLocale: string, 
  siteUrl: string
) {
  const hreflangTags = []

  // Add tag for each locale
  for (const locale of locales) {
    // Build the URL for this locale variant
    const localePath = locale.code === DEFAULT_LOCALE
      ? currentPath // Default locale has no prefix (clean URLs)
      : `/${locale.code}${currentPath}`

    // Use proper language-region format (e.g., sr-RS for Serbian in Serbia)
    hreflangTags.push({
      rel: 'alternate',
      hreflang: locale.iso, // Always use ISO format like sr-RS, en-US
      href: `${siteUrl}${localePath}`
    })
  }

  // Add x-default tag pointing to the default locale (RS - primary market)
  // This tells Google which version to show when locale can't be determined
  const defaultPath = currentPath // Since DEFAULT_LOCALE is 'rs' with no prefix
  hreflangTags.push({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${siteUrl}${defaultPath}`
  })

  return hreflangTags
}

/**
 * Centralized SEO for all pages:
 * - SSR-safe canonical from runtimeConfig.public.siteUrl + route
 * - OG/Twitter images: either explicit or a default
 * - i18n-aware: sets og:locale and hreflang tags
 * - Proper canonical URLs per locale
 */
export const useCustomSeoMeta = (options: SeoMetaOptions) => {
  const route = useRoute()
  const { locale, locales } = useI18n()
  const config = useRuntimeConfig()

  // Get site URL from config
  const siteUrl = config.public.siteUrl || 'https://konty.com'

  // Build proper canonical URL with locale handling
  const pathWithoutLocale = route.path.replace(/^\/(me|ba|us)/, '') || '/'
  const canonicalPath = locale.value === DEFAULT_LOCALE
    ? pathWithoutLocale
    : `/${locale.value}${pathWithoutLocale}`
  const canonical = options.url || `${siteUrl}${canonicalPath}`

  // Default OG image
  const seoImage = options.image || `${siteUrl}/og-default.webp`

  // Map i18n locale to OpenGraph locale
  const ogLocale = computed(() => {
    const current = (locales.value as LocaleConfig[]).find(l => l.code === locale.value)
    return current?.iso || 'sr-RS'
  })

  useSeoMeta({
    // Basic
    title: options.title,
    description: options.description,

    // Canonical
    ogUrl: canonical,

    // OpenGraph
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: seoImage,
    ogType: options.type || 'website',
    ogSiteName: 'Konty',
    ogLocale: ogLocale.value,

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: seoImage,

    // Robots (page-specific override or noindex flag)
    robots: options.noindex ? 'noindex, nofollow' : (options.robots || 'index, follow'),
    author: 'Konty'
  })

  // Generate hreflang tags for SEO
  const hreflangTags = generateHreflangTags(
    pathWithoutLocale,
    locales.value as LocaleConfig[],
    locale.value,
    siteUrl
  )

  // Add canonical and hreflang links
  useHead({
    link: [
      { rel: 'canonical', href: canonical },
      ...hreflangTags
    ],
    htmlAttrs: {
      lang: ogLocale.value
    }
  })
}
