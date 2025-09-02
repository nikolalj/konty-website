interface PageSeoOptions {
  title: string
  description: string
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const { locale } = useI18n()

  const ogLocale = {
    me: 'sr_ME',
    rs: 'sr_RS',
    ba: 'bs_BA',
    us: 'en_US'
  }[locale.value] || 'sr_RS'

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogLocale,
    robots: options.noindex ? 'noindex, nofollow' : 'index, follow'
  })
}
