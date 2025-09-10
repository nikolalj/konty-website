import { LOCALES } from "~~/config/locale.config.mjs"

interface PageSeoOptions {
  title: string
  description: string
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const { locale } = useI18n()

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogLocale: LOCALES.find(l => l.code === locale.value)?.iso || 'sr_RS',
    ...(options.noindex && { robots: 'noindex, nofollow' })
  })
}
