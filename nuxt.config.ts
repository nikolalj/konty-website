// nuxt.config.ts
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
      minify: 'terser',
      cssMinify: true,
      // ADD THESE NEW SETTINGS
      rollupOptions: {
        output: {
          manualChunks: {
            'vue-vendor': ['vue', 'vue-router'],
            'ui-vendor': ['@nuxt/ui']
          }
        }
      },
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      assetsInlineLimit: 4096 // Inline assets < 4kb
    },
    // ADD: CSS optimization
    css: {
      devSourcemap: false,
      postcss: {
        plugins: {
          cssnano: {
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true
            }]
          }
        }
      }
    }
  },

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxtjs/seo',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-gtag',
    // ADD: New performance modules
    '@nuxtjs/critters', // Critical CSS extraction
    '@nuxtjs/fontaine' // Font metric optimization
  ],

  // ADD: Critical CSS configuration
  critters: {
    config: {
      preload: 'swap',
      pruneSource: true
    }
  },

  // ADD: Font optimization
  fontMetrics: {
    fonts: ['Public Sans']
  },

  image: {
    quality: 85,
    format: ['webp', 'avif'],
    // ADD: Optimized loading
    provider: 'ipx',
    presets: {
      hero: {
        modifiers: {
          format: 'webp',
          quality: 90,
          width: 1200,
          height: 600,
          fit: 'cover'
        }
      },
      thumbnail: {
        modifiers: {
          format: 'webp',
          quality: 80,
          width: 300,
          height: 200,
          fit: 'cover'
        }
      },
      // ADD: New presets for better optimization
      card: {
        modifiers: {
          format: 'webp',
          quality: 85,
          width: 600,
          height: 400,
          fit: 'cover'
        }
      },
      avatar: {
        modifiers: {
          format: 'webp',
          quality: 90,
          width: 100,
          height: 100,
          fit: 'cover'
        }
      }
    },
    // ADD: Loading optimization
    loading: 'lazy',
    densities: [1, 2], // Support retina displays
    domains: ['konty.com'] // Allow external image optimization
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
    // ADD: Improved sitemap caching
    cacheMaxAgeSeconds: 3600,
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

    // ADD: Prerendering for better performance
    prerender: {
      crawlLinks: true,
      routes: ['/', '/products', '/pricing'],
      ignore: ['/admin', '/api']
    },

    // ADD: Better compression
    compressPublicAssets: {
      gzip: true,
      brotli: true
    },

    routeRules: {
      '/**': {
        headers: {
          'X-Frame-Options': 'DENY',
          'X-Content-Type-Options': 'nosniff',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
          'Permissions-Policy': 'camera=(), microphone=(), location=(), payment=()',
          'X-XSS-Protection': '1; mode=block',
        }
      },

      // UPDATE: Enhanced static asset caching
      '/images/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable',
          'X-Content-Type-Options': 'nosniff'
        }
      },

      '/_nuxt/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },

      // ADD: Font caching
      '/fonts/**': {
        headers: {
          'Cache-Control': 'public, max-age=31536000, immutable'
        }
      },

      // ADD: HTML caching for static pages
      '/': {
        isr: 3600, // Incremental Static Regeneration
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate'
        }
      },

      '/products': {
        isr: 3600,
        headers: {
          'Cache-Control': 's-maxage=3600, stale-while-revalidate'
        }
      },

      '/api/**': {
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate'
        }
      }
    }
  },

  runtimeConfig: {
    public: {
      googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID || 'GA_MEASUREMENT_ID',
      gtagId: process.env.GOOGLE_ANALYTICS_ID || 'GA_MEASUREMENT_ID'
    }
  },

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
    },
    // ADD: Lazy load translations
    lazy: true,
    strategy: 'prefix_except_default'
  },

  // UPDATE: Enable performance features
  experimental: {
    payloadExtraction: true, // CHANGED from false
    crossOriginPrefetch: true, // ADD
    viewTransition: true, // ADD
    componentIslands: true, // ADD
    asyncContext: true, // ADD
    treeshakeClientOnly: true, // ADD
    defaults: {
      nuxtLink: {
        prefetch: true,
        prefetchOn: { visibility: true, interaction: true }
      }
    }
  },

  // ADD: Render optimizations
  render: {
    bundleRenderer: {
      shouldPreload: (file: string, type: string) => {
        // Preload only critical resources
        if (type === 'font') return true
        if (type === 'style') return true
        if (type === 'script') return file.includes('app')
        return false
      }
    }
  },

  // ADD: App configuration for better hydration
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: false, // Disable for better performance
    head: {
      htmlAttrs: {
        lang: 'sr'
      },
      link: [
        // Preconnect to external domains
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' },
        { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
        { rel: 'dns-prefetch', href: 'https://www.googletagmanager.com' }
      ]
    }
  }
})
