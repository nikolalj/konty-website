import type { LocaleConfig } from '~/types/locale'
import { SEO_CONFIG } from '../../config/seo.config'
import { VALID_LOCALES, DEFAULT_LOCALE } from '~~/config/locale.config'

interface SeoMetaOptions {
  title: string
  description: string
  image?: string            // Optional explicit OG image URL
  type?: 'website' | 'article' | 'book' | 'profile'
  url?: string              // Optional canonical override
  robots?: string           // Optional robots directive
  noindex?: boolean         // Convenience flag to noindex
}

/**
 * Centralized SEO metadata management
 * Sets all necessary meta tags for SEO and social sharing
 */
export const useCustomSeoMeta = (options: SeoMetaOptions) => {
  // Validation
  if (!options.title) {
    console.warn('[SEO] Missing title for current page')
  }

  if (!options.description) {
    console.warn('[SEO] Missing description for current page')
  }

  const route = useRoute()
  const { locale, locales } = useI18n()
  const config = useRuntimeConfig()
  const siteUrl = config.public.siteUrl || 'https://konty.com'

  // Build canonical URL with proper locale handling
  const cleanPath = removeLocalePrefix(route.path)
  const canonicalPath = addLocalePrefix(locale.value, cleanPath)
  const normalizedPath = canonicalPath === '/' ? canonicalPath : canonicalPath.replace(/\/$/, '')
  const canonical = options.url || `${siteUrl}${normalizedPath}`

  // Get OG image - either explicit, route-based, or fallback
  const getOgImage = (): string => {
    if (options.image) return options.image

    const routeImage = SEO_CONFIG.ogImages[cleanPath as keyof typeof SEO_CONFIG.ogImages]
    const imagePath = routeImage || SEO_CONFIG.ogImages.default

    // Return absolute URL
    return imagePath.startsWith('http') ? imagePath : `${siteUrl}${imagePath}`
  }

  // Get OpenGraph locale from i18n config
  const getOgLocale = (): string => {
    const currentLocale = locales.value.find(l => l.code === locale.value) as LocaleConfig | undefined
    return currentLocale?.iso || 'sr-RS'
  }

  const seoImage = getOgImage()
  const ogLocale = getOgLocale()

  // Set all meta tags
  useSeoMeta({
    // Basic meta
    title: options.title,
    description: options.description,
    author: SEO_CONFIG.defaultAuthor,

    // Robots
    robots: options.noindex ? 'noindex, nofollow' : (options.robots || 'index, follow'),

    // OpenGraph
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: seoImage,
    ogType: options.type || 'website',
    ogSiteName: SEO_CONFIG.siteName,
    ogLocale,
    ogUrl: canonical,

    // Twitter
    twitterCard: SEO_CONFIG.twitterCard,
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: seoImage
  })

  // Set canonical and language
  useHead({
    link: [
      { rel: 'canonical', href: canonical }
    ],
    htmlAttrs: {
      lang: ogLocale
    }
  })
}

/**
 * Remove locale prefix from a path
 * @example '/me/pricing' -> '/pricing'
 * @example '/pricing' -> '/pricing'
 */
export function removeLocalePrefix(path: string): string {
  const nonDefaultLocales = VALID_LOCALES.filter(l => l !== DEFAULT_LOCALE)
  const pattern = new RegExp(`^/(${nonDefaultLocales.join('|')})`)
  return path.replace(pattern, '') || '/'
}

/**
 * Add locale prefix to a path if needed
 * @example ('me', '/pricing') -> '/me/pricing'
 * @example ('rs', '/pricing') -> '/pricing' (rs is default)
 */
export function addLocalePrefix(locale: string, path: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  if (locale === DEFAULT_LOCALE) return cleanPath

  // Don't duplicate prefix if already present
  if (cleanPath.startsWith(`/${locale}/`) || cleanPath === `/${locale}`) {
    return cleanPath
  }

  return `/${locale}${cleanPath}`
}
