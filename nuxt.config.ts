import { DEFAULT_LOCALE, LOCALE_STRATEGY, LOCALES } from './config/locale.config'

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  // TypeScript - Simplified, letting Nuxt handle most configs
  typescript: {
    strict: true,
    typeCheck: true
  },

  // Vite Build Optimization - Nuxt 4 optimized
  vite: {
    build: {
      minify: process.env.NODE_ENV === 'production' ? 'terser' : 'esbuild',  // Terser for prod (smaller), esbuild for dev (faster)
      cssMinify: true,
      cssCodeSplit: true,

      // Let Nuxt 4 handle automatic chunking
      rollupOptions: {
        output: {
          // Removed manual chunks - Nuxt's auto-chunking is smarter
        }
      },

      chunkSizeWarningLimit: 1000,

      // Source maps only in development
      sourcemap: process.env.NODE_ENV === 'development'
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
    '@saslavik/nuxt-gtm',
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

  // Site configuration - Foundation for all NuxtSEO modules
  site: {
    // Core site info
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com',

    // Environment detection for proper indexing control
    env: process.env.APP_ENV || process.env.NODE_ENV || 'development',

    // SEO settings
    trailingSlash: false,
    indexable: process.env.APP_ENV === 'production' && process.env.NUXT_PUBLIC_SITE_URL?.includes('konty.com'),

    // Name and description will come from i18n translations
    // Identity will be set at runtime by server plugin based on locale
  },

  // Core SEO module settings
  seo: {
    redirectToCanonicalSiteUrl: true,
    fallbackTitle: true,
    automaticDefaults: true
  },

  // Link Checker - Find and fix broken links automatically
  linkChecker: {
    enabled: true,

    // Exclude non-checkable links
    excludeLinks: [
      'mailto:*',     // Email links
      'tel:*',        // Phone links
      'sms:*',        // SMS links
    ],

    // Fail builds on broken links
    failOnError: true,

    // Report settings
    report: {
      html: true,
      markdown: true,
      json: true
    },

    // Only run in production builds
    runOnBuild: true,

    // Show in DevTools during development
    showLiveInspections: true
  },

  // Schema.org configuration
  schemaOrg: {
    defaults: true,
    identity: 'Organization', // Links to site.identity
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
            '/api/'
          ],
          sitemap: '/sitemap_index.xml',
          cleanParam: [
            // UTM (complete set)
            'utm_source',
            'utm_medium',
            'utm_campaign',
            'utm_term',
            'utm_content',

            // Platform click IDs
            'fbclid',
            'gclid',
            'msclkid',

            // General
            'ref',
            'source',

            // Email if you use it
            'mc_cid',
            'mc_eid'
          ]
        }
      : {
          // Non-production: Block everything
          disallow: ['/']
        }
    )
  },

  // Sitemap with automatic i18n multi-sitemap generation
  sitemap: {
    cacheMaxAgeSeconds: process.env.NODE_ENV === 'production' ? 3600 : 0,
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
    defaultLocale: DEFAULT_LOCALE.code,
    langDir: '../app/locales',
    detectBrowserLanguage: false,
    skipSettingLocaleOnNavigate: false,
    customRoutes: 'config',
    trailingSlash: false,
    strategy: LOCALE_STRATEGY,
    locales: LOCALES,
    vueI18n: './i18n.config.ts'
  },

  // Nitro - Server optimization for Nuxt 4
  nitro: {
    minify: true,
    timing: false,

    // Optimize server bundles
    rollupConfig: {
      output: {
        format: 'es',
        generatedCode: {
          constBindings: true
        }
      },
      treeshake: 'smallest'
    },

    // Module side effects optimization
    moduleSideEffects: ['unhead'],

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
          'Content-Security-Policy': "default-src 'self' 'unsafe-inline'; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://www.google.com; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com"
        }
      },

      // Immutable assets
      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/api/_nuxt_icon/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

      // SWR for dynamic content (better than ISR for SSR with locale detection)
      '/': { swr: 3600 },
      '/products': { swr: 7200 },
      '/pricing': { swr: 86400 }, // Daily

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
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL
    }
  },

  // Google Tag Manager
  gtm: {
    id: process.env.GTM_ID || '',
    enabled: true,
    debug: process.env.APP_ENV === 'development',
    loadScript: true,
    enableRouterSync: true,
    ignoredViews: [],
    trackOnNextTick: false,
    devtools: true
  },

  // Build optimizations
  build: {
    transpile: process.env.NODE_ENV === 'production' ? [] : ['@nuxt/ui-pro']
  },

  features: {
    // Smart CSS inlining - only inline critical above-fold components
    inlineStyles: (id) => {
      if (!id) return false

      // Inline critical above-fold components for faster FCP
      const criticalComponents = [
        'Hero',
        'Header',
        'AppHeader',
        'CountrySelector',
        'Button',
        'LocaleSuggestionBanner'
      ]

      return criticalComponents.some(component => id.includes(component))
    }
  },

  // Experimental features for Nuxt 4
  experimental: {
    viewTransition: true,        // Enable native view transitions API
    lazyHydration: true,         // Enable lazy hydration for components
    payloadExtraction: true,     // Extract payload for faster hydration
    componentIslands: true,      // Enable component islands for selective hydration
    asyncContext: true,          // Better async component handling
    writeEarlyHints: true,       // HTTP/2 Server Push hints
    crossOriginPrefetch: true,   // Use Speculation Rules API for prefetching
    renderJsonPayloads: true,    // Optimize JSON payload rendering
    
    // Link prefetching strategy - optimized for conversion
    defaults: {
      nuxtLink: {
        prefetch: false,         // Don't prefetch all links by default
        prefetchOn: {
          visibility: true,      // Only prefetch when link is visible
          interaction: false     // Don't prefetch on hover to save bandwidth
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

        // Preload font
        { rel: 'preload', as: 'font', href: '/fonts/PlusJakartaSans-Variable.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
      ],
    }
  },

  compatibilityDate: '2025-07-16'
})
