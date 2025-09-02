/**
 * Minimal SEO composable for pages
 * Uses Nuxt's native useSeoMeta with proper typing
 */

interface PageSeoOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article'
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const { locale } = useI18n()

  // Simple locale mapping for OG tags
  const ogLocale = {
    me: 'sr_ME',
    rs: 'sr_RS',
    ba: 'bs_BA',
    us: 'en_US'
  }[locale.value] || 'sr_RS'

  // Use provided image or fallback to a default
  // Note: We should create actual OG images later
  const ogImage = options.image || '/og-images/default.png'

  // Set SEO meta tags
  useSeoMeta({
    title: options.title,
    description: options.description,

    // OpenGraph
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage,
    ogType: options.type || 'website',
    ogLocale,
    ogSiteName: 'Konty',

    // Twitter
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: ogImage,

    // Robots
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow'
  })

  // Set additional meta via useHead
  useHead({
    meta: [
      { name: 'theme-color', content: '#1F6FE2' }
    ]
  })
}
