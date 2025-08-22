import type { LocaleConfig } from "~/types/locale"
import { DEFAULT_LOCALE } from "../../config/locale.config"

interface SeoMetaOptions {
  title: string
  description: string
  image?: string            // Optional explicit OG image
  type?: 'website' | 'article' | 'book' | 'profile'
  url?: string              // Optional canonical override
  robots?: string           // Optional robots override per page
}

/**
 * Generate hreflang tags for all available locales
 */
function generateHreflangTags(currentPath: string, locales: LocaleConfig[], currentLocale: string, siteUrl: string) {
  const hreflangTags = []

  // Add tag for each locale
  for (const locale of locales) {
    const localePath = locale.code === DEFAULT_LOCALE
      ? currentPath // Default locale has no prefix
      : `/${locale.code}${currentPath}`

    hreflangTags.push({
      rel: 'alternate',
      hreflang: locale.iso || locale.code,
      href: `${siteUrl}${localePath}`
    })
  }

  // Add x-default tag pointing to the default locale
  const defaultPath = currentPath
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

    // Robots (page-specific override supported)
    robots: options.robots || 'index, follow',
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
