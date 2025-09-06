interface PageSeoOptions {
  title: string
  description: string
  noindex?: boolean
  ogType?: string
  ogImage?: string
}

export const usePageSeo = (options: PageSeoOptions) => {
  const { locale } = useI18n()

  const ogLocale = {
    me: 'sr_ME',
    rs: 'sr_RS',
    ba: 'bs_BA',
    us: 'en_US'
  }[locale.value] || 'sr_RS'

  // Let Nuxt SEO Utils handle automatic inference of OG tags
  // Only set what's explicitly different or needed
  useSeoMeta({
    title: options.title,
    description: options.description,
    ogLocale,
    // Only set ogType if provided, otherwise let it default
    ...(options.ogType && { ogType: options.ogType }),
    // Only set ogImage if provided, otherwise let it use defaults
    ...(options.ogImage && { ogImage: options.ogImage }),
    // Only set robots for noindex pages, let defaults handle normal pages
    ...(options.noindex && { robots: 'noindex, nofollow' })
  })
}
