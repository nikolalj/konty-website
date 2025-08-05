// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@vueuse/nuxt'
  ],

  css: [
    '~/assets/css/main.css'
  ],

  site: {
    url: 'https://konty.com',
    name: 'Konty',
    description: 'Professional POS System for Restaurants and Retail - Streamline your business operations with Konty\'s comprehensive point-of-sale solution.',
    defaultLocale: 'en'
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  sitemap: {
    strictNuxtContentPaths: true
  },

  compatibilityDate: '2025-07-16',
})
