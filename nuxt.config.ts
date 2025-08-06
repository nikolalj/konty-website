// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  sourcemap: false,

  typescript: {
    typeCheck: true,
    tsConfig: {
      include: [
        './types/**/*'
      ]
    }
  },

  vite: {
    build: {
      sourcemap: false,
      minify: 'terser', // Better compression than default
      cssMinify: true
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-gtag'
  ],

  image: {
    quality: 85,
    format: ['webp', 'avif'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    },
    presets: {
      hero: {
        modifiers: {
          format: 'webp',
          quality: 90,
          width: 1200,
          height: 600
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          quality: 80,
          width: 300,
          height: 200
        }
      }
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  site: {
    url: 'https://konty.com',
    name: 'Konty',
    description: 'Professional POS System for Restaurants and Retail - Streamline your business operations with Konty\'s comprehensive point-of-sale solution.',
    defaultLocale: 'sr'
  },

  seo: {
    redirectToCanonicalSiteUrl: true
  },

  sitemap: {
    strictNuxtContentPaths: true,
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString()
    },
    urls: [
      {
        loc: '/',
        priority: 1.0,
        changefreq: 'daily'
      },
      {
        loc: '/products',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        loc: '/konty-retail',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        loc: '/konty-hospitality',
        priority: 0.9,
        changefreq: 'weekly'
      },
      {
        loc: '/pricing',
        priority: 0.8,
        changefreq: 'weekly'
      },
      {
        loc: '/demo',
        priority: 0.8,
        changefreq: 'monthly'
      },
      {
        loc: '/about',
        priority: 0.7,
        changefreq: 'monthly'
      }
    ]
  },

  compatibilityDate: '2025-07-16',

  nitro: {
    compressPublicAssets: true,
    minify: true,
    externals: {
      inline: ['unhead'],
    },
    // Security headers configuration
    routeRules: {
      '/**': {
        headers: {
          // Prevent clickjacking attacks
          'X-Frame-Options': 'DENY',

          // Prevent MIME type sniffing
          'X-Content-Type-Options': 'nosniff',

          // Control referrer information
          'Referrer-Policy': 'strict-origin-when-cross-origin',

          // Permissions policy for privacy
          'Permissions-Policy': 'camera=(), microphone=(), location=(), payment=()',

          // XSS protection (legacy support)
          'X-XSS-Protection': '1; mode=block',

          // HSTS - Force HTTPS (uncomment when deployed with SSL)
          // 'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        }
      },

      // Static assets caching
      '/images/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },

      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },

      // API routes (if any)
      '/api/**': {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    }
  },


  // Environment variables
  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'GA_MEASUREMENT_ID',
      gtagId: process.env.GOOGLE_ANALYTICS_ID || 'GA_MEASUREMENT_ID'
    }
  },

  // Multi-language setup (ready for future expansion)
  i18n: {
    defaultLocale: 'sr',
    locales: [
      {
        code: 'sr',
        iso: 'sr-RS',
        name: 'Srpski'
      }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root'
    }
  },

  experimental: {
    payloadExtraction: false // Reduces HTML size
  },
})
