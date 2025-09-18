import { DEFAULT_LOCALE, LOCALES } from "~/config/locale.config.mjs"

interface PageSeoOptions {
  title: string
  description: string
  noindex?: boolean
}

export const usePageSeo = (options: PageSeoOptions) => {
  const { locale } = useI18n()
  const route = useRoute()
  const localePath = useLocalePath()
  const siteUrl = useRuntimeConfig().public.siteUrl

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogLocale: LOCALES.find(l => l.code === locale.value)?.iso || DEFAULT_LOCALE.iso,
    ...(options.noindex && { robots: 'noindex, nofollow' })
  })

  // Add Twitter Card meta tags using useHead (required by TechSEORequirements.txt)
  useHead({
    meta: [
      { name: 'twitter:title', content: options.title },
      { name: 'twitter:description', content: options.description },
      { property: 'twitter:url', content: `${siteUrl}${localePath(route.path)}` },
      { name: 'twitter:site', content: '@kontypos' }
    ]
  })
}
