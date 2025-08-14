import type { LocaleObject } from "@nuxtjs/i18n"

interface SeoMetaOptions {
  title: string
  description: string
  image?: string            // Optional explicit OG image
  type?: 'website' | 'article' | 'book' | 'profile'
  url?: string              // Optional canonical override
  robots?: string           // Optional robots override per page
}

/**
 * Centralized SEO for all pages:
 * - SSR-safe canonical from runtimeConfig.public.siteUrl + route
 * - OG/Twitter images: either explicit or a default (see TODO for dynamic OG generator)
 * - i18n-aware: sets og:locale, and lets @nuxtjs/i18n inject alternates via useLocaleHead
 */
export const useCustomSeoMeta = (options: SeoMetaOptions) => {
  const route = useRoute()
  const { locale, locales } = useI18n()
  const config = useRuntimeConfig()

  // Build canonical URL
  const canonical = options.url || `${(config.public.siteUrl || 'https://konty.com')}${route.fullPath}`

  // Default OG image (replace with your dynamic generator when ready)
  // TODO: Implement dynamic OG image generator via /api/og using Satori + Resvg
  const seoImage = options.image || 'https://konty.com/og-default.webp'

  // Map i18n locale to OpenGraph locale (basic mapping)
  const ogLocale = computed(() => {
    // locales can be array of { code, iso }, prefer iso
    const current = (locales.value as LocaleObject[]).find(l => l.code === locale.value)
    return current?.language || 'sr-RS'
  })

  useSeoMeta({
    // Basic
    title: options.title,
    description: options.description,

    // Canonical
    ogUrl: canonical,             // for OG
    // @nuxtjs/seo will also handle canonical link automatically,
    // but we add a hard fallback to be explicit:
    // NOTE: unhead canonical link is added via useHead below

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

  // Ensure canonical <link> exists even if a module is misconfigured.
  useHead({
    link: [
      { rel: 'canonical', href: canonical }
    ]
  })

  // Let i18n add hreflang alternates + html lang/dir
  const i18nHead = useLocaleHead({ dir: true, seo: true })
  useHead(i18nHead)
}
