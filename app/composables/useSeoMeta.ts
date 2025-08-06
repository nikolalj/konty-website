interface SeoMetaOptions {
  title: string
  description: string
  image?: string
  type?: 'website' | 'article' | 'book' | 'profile'
  url?: string
}

export const useCustomSeoMeta = (options: SeoMetaOptions) => {
  const route = useRoute()
  const currentUrl = `https://konty.com${route.fullPath}`
  
  const seoImage = options.image || 'https://konty.com/og-default.webp'
  
  useSeoMeta({
    // Basic meta tags
    title: options.title,
    description: options.description,
    
    // OpenGraph meta tags
    ogTitle: options.title,
    ogDescription: options.description,
    ogImage: seoImage,
    ogUrl: options.url || currentUrl,
    ogType: options.type || 'website',
    ogSiteName: 'Konty',
    
    // Twitter Card meta tags
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: seoImage,
    
    // Additional meta tags
    robots: 'index, follow',
    author: 'Konty'
  })
  
  // @nuxtjs/seo already handles canonical URLs automatically
}