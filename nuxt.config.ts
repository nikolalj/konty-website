// https://nuxt.com/docs/api/configuration/nuxt-config
import { DEFAULT_LOCALE, LOCALE_CONFIG } from './config/locale.config'

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
      minify: 'terser',
      cssMinify: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router']
          },
        }
      },
      chunkSizeWarningLimit: 1000
    },
    css: {
      devSourcemap: false
    },
  },

  // PostCSS - Production CSS optimization
  postcss: {
    plugins: {
      ...(process.env.APP_ENV === 'production' && process.env.NUXT_PUBLIC_SITE_URL?.includes('konty.com') && {
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

  // Modules - Order matters
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/image',
    '@nuxt/icon',
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/fonts',
    '@nuxtjs/seo',
    'nuxt-gtag',
    '@nuxt/eslint',
    '@nuxthub/core'
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
      og: { modifiers: { format: 'avif', quality: 85, width: 1200, height: 630, fit: 'cover' }},
      twitter: { modifiers: { format: 'avif', quality: 85, width: 1200, height: 600, fit: 'cover' }},
    },
    domains: ['konty.com'],
    ipx: { maxAge: 31536000 }
  },

  css: [
    '~/assets/css/main.css'
  ],

  // Site configuration - Single source of truth for all SEO/Schema data
  site: {
    // Core site info
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com',
    name: 'Konty POS',
    description: 'Modern Point of Sale system for restaurants and retail. 26+ years of reliability. 9,000+ businesses trust us.',
    
    // SEO settings
    trailingSlash: false,
    indexable: process.env.APP_ENV === 'production' && process.env.NUXT_PUBLIC_SITE_URL?.includes('konty.com'),
    
    // Organization identity for Schema.org (automatically used on all pages)
    identity: {
      type: 'Organization',
      name: 'Konty d.o.o.',
      logo: '/images/branding/logo-light.svg',
      // Social profiles for Knowledge Graph
      sameAs: [
        'https://www.facebook.com/konty',
        'https://www.linkedin.com/company/konty'
      ],
      // Trust signals
      foundingDate: '1998',
      numberOfEmployees: {
        '@type': 'QuantitativeValue',
        minValue: 50,
        maxValue: 100
      }
    }
  },

  // Core SEO module settings
  seo: {
    redirectToCanonicalSiteUrl: true,
    fallbackTitle: false,
    automaticDefaults: true
  },

  // Schema.org configuration
  schemaOrg: {
    defaults: true,
    identity: 'Organization', // Links to site.identity
    // Enable reactive schemas for development
    reactive: process.env.NODE_ENV === 'development'
  },

  // Robots.txt configuration
  robots: {
    enabled: true,
    ...(process.env.APP_ENV === 'production' && process.env.NUXT_PUBLIC_SITE_URL?.includes('konty.com')
      ? {
          // Production: Allow crawling with smart restrictions
          allow: ['/'],
          disallow: [
            '/api/',      // Sitemap generation endpoints
            '/*?utm_*',   // Marketing campaign tracking
            '/*?ref=*',   // Referral tracking
          ],
          sitemap: '/sitemap_index.xml'
        }
      : {
          // Non-production: Block everything
          disallow: ['/']
        }
    )
  },

  // Sitemap with automatic i18n multi-sitemap generation
  sitemap: {
    cacheMaxAgeSeconds: 3600,
    experimentalCompression: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.7
    },
    sources: [
      '/api/__sitemap__/urls',
      '/api/__sitemap__/blog'
    ]
  },

  // OG Image generation with Satori
  ogImage: {
    // Use Plus Jakarta Sans - supports Serbian/Bosnian
    fonts: [
      'Plus+Jakarta+Sans:400',
      'Plus+Jakarta+Sans:600',
      'Plus+Jakarta+Sans:700'
    ],

    // Default settings for all OG images
    defaults: {
      width: 1200,
      height: 630,
      renderer: 'satori', // Fast, universal compatibility
      cacheMaxAgeSeconds: 60 * 60 * 24 * 7 // 7 days cache
    },

    // Component defaults
    componentOptions: {
      global: true // Make OG image components globally available
    }
  },

  i18n: {
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL,
    defaultLocale: DEFAULT_LOCALE,
    langDir: '../app/locales',
    detectBrowserLanguage: false,
    skipSettingLocaleOnNavigate: false,
    customRoutes: 'config',
    trailingSlash: false,
    strategy: LOCALE_CONFIG.STRATEGY,
    locales: [
      {
        code: 'me',
        iso: 'sr-ME',
        name: 'Crna Gora',
        file: 'me.json',
        flag: 'i-circle-flags:me',
        currency: 'EUR',
        currencySymbol: '€'
      },
      {
        code: 'rs',
        iso: 'sr-RS',
        name: 'Srbija',
        file: 'rs.json',
        flag: 'i-circle-flags:rs',
        currency: 'RSD',
        currencySymbol: 'RSD'
      },
      {
        code: 'ba',
        iso: 'bs-BA',
        name: 'Bosna i Hercegovina',
        file: 'ba.json',
        flag: 'i-circle-flags:ba',
        currency: 'BAM',
        currencySymbol: 'KM'
      },
      {
        code: 'us',
        iso: 'en-US',
        name: 'United States',
        file: 'us.json',
        flag: 'i-circle-flags:us',
        currency: 'USD',
        currencySymbol: '$'
      }
    ],
    vueI18n: './i18n.config.ts'
  },

  // Nitro - Server optimization
  nitro: {
    minify: true,
    timing: false,

    externals: {
      inline: ['unhead']
    },

    // Prerendering disabled - using SSR for dynamic locale detection
    // All pages need server-side rendering for locale redirects to work
    prerender: {
      crawlLinks: false,
      routes: [],
      ignore: ['/admin', '/api', '/__nuxt_error']
    },

    // prerender: {
    //   // Pre-render the homepage
    //   routes: ['/'],
    //   // Then crawl all the links on the page
    //   crawlLinks: true
    // },

    // Compression
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },

    routeRules: {
      // URL Redirects - SEO-preserving redirects for changed URLs
      // Add redirects here when changing URL structure or fixing broken links
      // Example redirects:
      // '/old-pricing': { redirect: { to: '/pricing', statusCode: 301 } },

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
          'X-XSS-Protection': '1; mode=block',
          'Content-Security-Policy': "default-src 'self' 'unsafe-inline'; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'"
        }
      },

      // Immutable assets
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/api/_nuxt_icon/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

      // ISR for dynamic content
      '/': { isr: 3600 },
      '/products': { isr: 7200 },
      '/pricing': { isr: 86400 }, // Daily

      // API configuration
      '/api/**': {
        cors: true,
        headers: { 'cache-control': 'no-store' }
      },
    }
  },

  runtimeConfig: {
    env: process.env.APP_ENV,

    public: {
      url: process.env.NUXT_PUBLIC_SITE_URL
    }
  },

  // Google Analytics 4
  gtag: {
    id: process.env.GOOGLE_ANALYTICS_ID || '',
    config: {
      send_page_view: false,
      debug_mode: process.env.APP_ENV === 'development'
    }
  },

  features: {
    inlineStyles: true
  },

  // Experimental features for Nuxt 4
  experimental: {
    viewTransition: true,        // Enable native view transitions API

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
