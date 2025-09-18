import { DEFAULT_LOCALE, LOCALE_STRATEGY, LOCALES } from './app/config/locale.config.mjs'

export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  // TypeScript - Simplified, letting Nuxt handle most configs
  typescript: {
    strict: true,
    typeCheck: true
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
    '@nuxt/content',
    '@saslavik/nuxt-gtm',
    '@nuxt/eslint',
    ...(process.env.USE_CLOUDFLARE_DEV === 'true' ? ['nitro-cloudflare-dev'] : [])
  ],

  features: {
    inlineStyles: true  // Inline all styles for zero render-blocking CSS
  },

  // Vite Build Optimization - Only options that actually matter
  vite: {
    build: {
      // CSS optimization for ATF performance
      cssCodeSplit: false,     // CRITICAL: Bundles all CSS into single file for inlining
      cssMinify: 'esbuild',    // Fast CSS minification (default but explicit for clarity)

      // JS minification
      minify: 'esbuild',

      // No sourcemaps in production for smaller bundles and security
      sourcemap: false
    }
  },

  fonts: {
    provider: 'local',
    families: [
      {
        name: 'Plus Jakarta Sans',
        src: '/fonts/PlusJakartaSans-Variable.woff2',
        weights: ['200 800'],
        styles: ['normal'],
        global: true
      }
    ]
  },

  // Image optimization
  image: {
    quality: 80,
    format: ['avif', 'webp'], // AVIF primary, WebP fallback
    provider: 'ipx',
    screens: { sm: 640, md: 768, lg: 1024, xl: 1280 },
    domains: ['konty.com']
  },

  css: [
    '~/assets/css/main.css'
  ],

  // Site configuration - Foundation for all NuxtSEO modules
  site: {
    name: 'Konty',

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
    identity: 'Organization' // Links to site.identity
  },

  // Robots.txt configuration
  robots: {
    enabled: true,
    allow: ['/'],
    disallow: ['/api/'],
    sitemap: '/sitemap_index.xml',
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
      extension: 'png',
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

  // Nuxt Content configuration
  content: {
    database: {
      ...(process.env.APP_ENV === 'development'
        ? { type: 'sqlite', filename: '.nuxt/content.sqlite' }
        : { type: 'd1', bindingName: 'konty_content_db' })
    },
    experimental: {
      sqliteConnector: 'better-sqlite3'
    }
  },

  nitro: {
    preset: process.env.APP_ENV === 'development' ? 'node-server' : 'cloudflare_module',
    cloudflare: {
      deployConfig: false
    },

    minify: true,
    timing: false,

    // Optimize server bundles
    rollupConfig: {
      treeshake: 'smallest'  // Most impactful optimization
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
      '/allegra': { redirect: '/' },
      '/aria': { redirect: '/' },
      '/allegrapos': { redirect: '/' },
      '/ariapos': { redirect: '/' },
      '/product': { redirect: '/products' },
      '/price': { redirect: '/pricing' },

      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
          'Content-Security-Policy': "default-src 'self' 'unsafe-inline'; connect-src 'self' https://www.googletagmanager.com https://www.google-analytics.com https://region1.google-analytics.com https://www.google.com; img-src 'self' data: https: blob:; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://ssl.google-analytics.com https://www.google.com; style-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com"
        }
      },

      '/_nuxt/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/images/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/api/_nuxt_icon/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
      '/_ipx/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },

      '/': {
        swr: 3600,
        headers: {
          'cache-control': 's-maxage=300, stale-while-revalidate=3600',
          'Vary': 'Accept-Language'
        }
      },
      '/products': {
        swr: 7200,
        headers: {
          'cache-control': 's-maxage=600, stale-while-revalidate=7200'
        }
      },
      '/pricing': {
        swr: 86400,
        headers: {
          'cache-control': 's-maxage=3600, stale-while-revalidate=86400'
        }
      },

      '/api/**': {
        cors: true,
        headers: { 'cache-control': 'no-store' }
      }
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
    loadScript: false,  // Manual loading for performance
    enableRouterSync: true,
    devtools: process.env.APP_ENV === 'development'
  },

  // Experimental features
  experimental: {
    crossOriginPrefetch: true,   // Smart prefetching with Speculation Rules API
    appManifest: false,          // Cloudflare Workers compatibility

    // Link prefetching strategy - critical for conversions
    defaults: {
      nuxtLink: {
        prefetch: false,         // Don't prefetch all links by default
        prefetchOn: {
          visibility: true       // Only prefetch when link is visible
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
        { name: 'theme-color', content: '#1F6FE2' }  // Match brand primary color
      ],

      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://www.googletagmanager.com', crossorigin: '' },

        // Preload critical resources
        { rel: 'preload', as: 'font', href: '/fonts/PlusJakartaSans-Variable.woff2', type: 'font/woff2', crossorigin: 'anonymous' },
        { rel: 'preload', as: 'image', href: '/images/hero/bg-light.avif', type: 'image/avif', fetchpriority: 'high' },
        { rel: 'preload', as: 'image', href: '/images/hero/bg-dark.avif', type: 'image/avif', fetchpriority: 'high' },
      ],
    }
  },

  compatibilityDate: '2025-07-16'
})
