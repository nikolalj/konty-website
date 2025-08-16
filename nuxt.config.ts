// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Development
  devtools: { enabled: true },
  sourcemap: false,

  // TypeScript - Simplified, letting Nuxt handle most configs
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Vite Build Optimization
  vite: {
    build: {
      // Critical for performance
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router']
          }
        }
      },
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096
    },
    css: {
      devSourcemap: false
    },
  },

  // PostCSS - Production CSS optimization
  postcss: {
    plugins: {
      ...(process.env.NODE_ENV === 'production' && {
        cssnano: {
          preset: ['default', {
            discardComments: { removeAll: true },
            reduceIdents: true,
            mergeRules: true,
            normalizeWhitespace: true,
            minifyFontValues: true,
            minifySelectors: true
          }]
        }
      })
    }
  },

  // Modules - Order matters for optimization
  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui-pro',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-gtag',
    '@nuxt/eslint',
    '@nuxt/icon'
  ],

  fonts: {
    provider: 'local',
    families: [
      {
        name: 'Plus Jakarta Sans',
        src: '/fonts/PlusJakartaSans-Variable.woff2',
        weights: ['200 800'],
        styles: ['normal'],
        global: true
      },
      {
        name: 'Plus Jakarta Sans',
        src: '/fonts/PlusJakartaSans-Variable-Italic.woff2',
        weights: ['200 800'],
        styles: ['italic']
      }
    ]
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['avif', 'webp'],
    provider: 'ipx',
    screens: { xs: 320, sm: 640, md: 768, lg: 1024, xl: 1280, xxl: 1536 },
    presets: {
      hero: { modifiers: { format: 'avif', quality: 90, width: 1200, height: 600, fit: 'cover' }},
      card: { modifiers: { format: 'avif', quality: 85, width: 600, height: 400, fit: 'cover' }},
      thumbnail: { modifiers: { format: 'avif', quality: 75, width: 300, height: 200, fit: 'cover' }},
      avatar: { modifiers: { format: 'avif', quality: 90, width: 100, height: 100, fit: 'cover' }}
    },
    densities: [1, 2],
    domains: ['konty.com'],
    ipx: { maxAge: 31536000 }
  },

  css: ['~/assets/css/main.css'],

  // SEO Configuration
  site: {
    url: 'https://konty.com',
    name: 'Konty POS',
    description: 'Profesionalni POS sistem za restorane i maloprodaju. Povećajte efikasnost poslovanja sa Konty rešenjem.',
    defaultLocale: 'sr',
    identity: {
      type: 'Organization'
    },
    twitter: '@kontypos', // If you have Twitter
    trailingSlash: false
  },

  seo: {
    redirectToCanonicalSiteUrl: true,
    fallbackTitle: false // Use exact titles
  },

  // Sitemap with better configuration
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    exclude: ['/admin/**', '/api/**', '/test/**'],
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    urls: [
      { loc: '/', priority: 1.0, changefreq: 'daily' },
      { loc: '/products', priority: 0.9, changefreq: 'weekly' },
      { loc: '/konty-retail', priority: 0.9, changefreq: 'weekly' },
      { loc: '/konty-hospitality', priority: 0.9, changefreq: 'weekly' },
      { loc: '/pricing', priority: 0.9, changefreq: 'weekly' },
      { loc: '/demo', priority: 0.8, changefreq: 'monthly' },
      { loc: '/about', priority: 0.7, changefreq: 'monthly' }
    ]
  },

  // Internationalization
  i18n: {
    baseUrl: 'https://konty.com',
    defaultLocale: 'sr',
    locales: [
      { code: 'sr', language: 'sr-RS', name: 'Srpski' },
      { code: 'en', language: 'en-US', name: 'English' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'sr'
    },
    strategy: 'prefix_except_default',
  },

  // Nitro - Server optimization
  nitro: {
    minify: true,
    timing: false, // Disable timing in production for security

    externals: {
      inline: ['unhead']
    },

    // Prerendering for SEO
    prerender: {
      crawlLinks: true,
      routes: ['/', '/products', '/pricing', '/konty-retail', '/konty-hospitality'],
      ignore: ['/admin', '/api', '/__nuxt_error']
    },

    // Compression
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },

    // Route-specific rules
    routeRules: {
      '/allegra': { redirect: '/' },
      '/aria': { redirect: '/' },
      '/allegrapos': { redirect: '/' },
      '/ariapos': { redirect: '/' },
      '/product': { redirect: '/products' },
      '/price': { redirect: '/pricing' },
      '/contact': { redirect: '/about' },

      // Security headers for all routes
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'X-XSS-Protection': '1; mode=block'
        }
      },

      // Immutable assets
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

      // ISR for dynamic content
      '/': { isr: 3600 },
      '/products': { isr: 7200 },
      '/pricing': { isr: 86400 }, // Daily

      // API configuration
      '/api/**': {
        cors: true,
        headers: { 'cache-control': 'no-store' }
      }
    }
  },

  // Runtime configuration
  runtimeConfig: {
    // Private keys (server-only)
    apiSecret: '',

    // Public keys (available on client)
    public: {
      googleAnalyticsId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
      gtagId: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com'
    }
  },

  // Google Analytics
  gtag: {
    id: process.env.NUXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
    config: {
      page_title: 'Konty POS',
      send_page_view: true
    }
  },

  // Experimental features for Nuxt 4
  experimental: {
    payloadExtraction: true,      // Extract payload for faster hydration
    crossOriginPrefetch: true,    // Prefetch cross-origin resources
    viewTransition: true,         // Native view transitions
    componentIslands: true,       // Selective hydration
    asyncContext: true,           // Async component context
    headNext: true,              // Optimized head management

    // Link prefetching strategy
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: {
          visibility: true,    // Prefetch when visible
          interaction: true    // Prefetch on hover
        }
      }
    }
  },

  // App configuration
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: false, // Disabled for performance

    head: {
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'color-scheme', content: 'light dark' },
        { name: 'theme-color', content: '#00dc82' }
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://www.google-analytics.com', crossorigin: '' },

        // Preload font
        { rel: 'preload', as: 'font', href: '/fonts/PlusJakartaSans-Variable.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      ],
    }
  },

  compatibilityDate: '2025-07-16'
})