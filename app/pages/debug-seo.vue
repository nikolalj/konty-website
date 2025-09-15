<template>
  <div class="py-40">
    <UContainer>
      <h1 class="text-2xl font-bold mb-6">SEO Debug Info</h1>

      <!-- Navigation tabs -->
      <div class="mb-6">
        <div class="flex space-x-4 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="[
              'px-4 py-2 font-medium transition-colors whitespace-nowrap',
              activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200'
            ]"
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Core Config Tab -->
        <div v-if="activeTab === 'core'" class="space-y-6">
          <!-- Site Config Section -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Site Config</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedSiteConfig }}</pre>
          </UCard>

          <!-- Current Locale Section -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Locale Info</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedLocaleInfo }}</pre>
          </UCard>

          <!-- Quick Reference -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Quick Reference</h2>
            </template>
            <div class="space-y-2 text-sm">
              <div><strong>Site URL:</strong> {{ siteConfig.url }}</div>
              <div><strong>Site Name:</strong> {{ siteConfig.name || 'Not set in base config' }}</div>
              <div><strong>Site Description:</strong> {{ siteConfig.description || 'Not set' }}</div>
              <div><strong>Current Locale:</strong> {{ locale }}</div>
              <div><strong>Current Locale (from site config):</strong> {{ siteConfig.currentLocale || 'Not set' }}</div>
              <div><strong>Environment:</strong> {{ siteConfig.env }}</div>
              <div><strong>Indexable:</strong> {{ siteConfig.indexable ? 'Yes' : 'No' }}</div>
              <div><strong>Has Identity:</strong> {{ siteConfig.identity ? 'Yes' : 'No' }}</div>
              <div><strong>Identity Name:</strong> {{ siteConfig.identity?.name || 'Not set' }}</div>
              <div><strong>Has Business Metrics:</strong> {{ siteConfig.businessMetrics ? 'Yes' : 'No' }}</div>
              <div>
                <strong>Business Metrics:</strong>
                <span v-if="siteConfig.businessMetrics">
                  {{ siteConfig.businessMetrics.yearsInBusiness }} years,
                  {{ siteConfig.businessMetrics.totalCustomers }} customers
                </span>
                <span v-else>Not available</span>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Meta Tags Tab -->
        <div v-if="activeTab === 'meta'" class="space-y-6">
          <!-- Meta Tags -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Current Meta Tags</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedMetaTags }}</pre>
          </UCard>

          <!-- Open Graph Tags -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Open Graph Tags</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedOgTags }}</pre>
          </UCard>

          <!-- Twitter Card Tags -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Twitter Card Tags</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedTwitterTags }}</pre>
          </UCard>

          <!-- Link Tags -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Link Tags</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedLinkTags }}</pre>
          </UCard>
        </div>

        <!-- Schema.org Tab -->
        <div v-if="activeTab === 'schema'" class="space-y-6">
          <!-- Schema.org Data -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Schema.org Structured Data</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedSchemaData }}</pre>
          </UCard>

          <!-- Schema Validation -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Schema Validation</h2>
            </template>
            <div class="space-y-2">
              <p class="text-sm text-gray-600 dark:text-gray-400">Test your structured data:</p>
              <a
                :href="`https://validator.schema.org/#url=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <UIcon name="i-heroicons-arrow-top-right-on-square" />
                Schema.org Validator
              </a>
              <br>
              <a
                :href="`https://search.google.com/test/rich-results?url=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <UIcon name="i-heroicons-arrow-top-right-on-square" />
                Google Rich Results Test
              </a>
            </div>
          </UCard>
        </div>

        <!-- Technical SEO Tab -->
        <div v-if="activeTab === 'technical'" class="space-y-6">
          <!-- Robots Configuration -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Robots Configuration</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedRobotsInfo }}</pre>
            <div class="mt-3">
              <a
                href="/robots.txt"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <UIcon name="i-heroicons-arrow-top-right-on-square" />
                View robots.txt
              </a>
            </div>
          </UCard>

          <!-- Sitemap Info -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Sitemap Configuration</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedSitemapInfo }}</pre>
            <div class="mt-3 space-y-2">
              <a
                href="/sitemap_index.xml"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <UIcon name="i-heroicons-arrow-top-right-on-square" />
                View Sitemap Index
              </a>
              <div v-for="loc in ['me', 'rs', 'ba', 'us']" :key="loc">
                <a
                  :href="`/sitemap_${loc}.xml`"
                  target="_blank"
                  class="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <UIcon name="i-heroicons-arrow-top-right-on-square" />
                  View {{ loc.toUpperCase() }} Sitemap
                </a>
              </div>
            </div>
          </UCard>

          <!-- Canonical URL -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Canonical URL</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ canonicalUrl }}</pre>
          </UCard>

          <!-- Alternate Languages -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Alternate Language Links</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedAlternateLinks }}</pre>
          </UCard>
        </div>

        <!-- OG Image Tab -->
        <div v-if="activeTab === 'ogimage'" class="space-y-6">
          <!-- OG Image Configuration -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">OG Image Configuration</h2>
            </template>
            <pre class="p-4 rounded overflow-x-auto">{{ formattedOgImageConfig }}</pre>
          </UCard>

          <!-- Current OG Image -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Current OG Image</h2>
            </template>
            <div class="space-y-3">
              <div>
                <strong>URL:</strong>
                <span class="text-sm">{{ ogImageUrl || 'Not set' }}</span>
              </div>
              <div v-if="ogImageUrl">
                <img
                  :src="ogImageUrl"
                  alt="OG Image Preview"
                  class="border rounded max-w-full"
                  style="max-width: 600px"
                >
              </div>
              <div class="space-y-2">
                <a
                  :href="`https://www.opengraph.xyz/url/${encodeURIComponent(currentUrl)}`"
                  target="_blank"
                  class="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <UIcon name="i-heroicons-arrow-top-right-on-square" />
                  Preview on OpenGraph.xyz
                </a>
                <br>
                <a
                  :href="`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(currentUrl)}`"
                  target="_blank"
                  class="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <UIcon name="i-heroicons-arrow-top-right-on-square" />
                  Facebook Sharing Debugger
                </a>
                <br>
                <a
                  :href="`https://cards-dev.twitter.com/validator`"
                  target="_blank"
                  class="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  <UIcon name="i-heroicons-arrow-top-right-on-square" />
                  Twitter Card Validator
                </a>
              </div>
            </div>
          </UCard>
        </div>

        <!-- Diagnostics Tab -->
        <div v-if="activeTab === 'diagnostics'" class="space-y-6">
          <!-- SEO Issues -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">SEO Issues & Warnings</h2>
            </template>
            <div class="space-y-2">
              <div v-for="issue in seoIssues" :key="issue.id" class="flex items-start gap-2">
                <UIcon
                  :name="issue.severity === 'error' ? 'i-heroicons-x-circle' : 'i-heroicons-exclamation-triangle'"
                  :class="issue.severity === 'error' ? 'text-red-500' : 'text-yellow-500'"
                  class="mt-0.5"
                />
                <div>
                  <p class="font-medium">{{ issue.title }}</p>
                  <p class="text-sm text-gray-600 dark:text-gray-400">{{ issue.description }}</p>
                </div>
              </div>
              <p v-if="seoIssues.length === 0" class="text-green-600 dark:text-green-400">
                ✓ No SEO issues detected
              </p>
            </div>
          </UCard>

          <!-- Performance Metrics -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Performance Metrics</h2>
            </template>
            <div class="space-y-2">
              <p class="text-sm text-gray-600 dark:text-gray-400">
                Run performance tests to measure Core Web Vitals:
              </p>
              <a
                :href="`https://pagespeed.web.dev/analysis?url=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <UIcon name="i-heroicons-arrow-top-right-on-square" />
                PageSpeed Insights
              </a>
              <br>
              <a
                :href="`https://www.webpagetest.org/?url=${encodeURIComponent(currentUrl)}`"
                target="_blank"
                class="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <UIcon name="i-heroicons-arrow-top-right-on-square" />
                WebPageTest
              </a>
            </div>
          </UCard>

          <!-- Console Output -->
          <UCard :ui="{ body: 'bg-[#10141e]', header: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]' }">
            <template #header>
              <h2 class="text-lg font-semibold">Console Output</h2>
            </template>
            <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">
              Check browser console for detailed SEO debug logs
            </p>
            <UButton variant="outline" size="sm" @click="logDetailedInfo">
              Log Detailed Info to Console
            </UButton>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
// Tab management
const activeTab = ref('core')
const tabs = [
  { id: 'core', label: 'Core Config' },
  { id: 'meta', label: 'Meta Tags' },
  { id: 'schema', label: 'Schema.org' },
  { id: 'technical', label: 'Technical SEO' },
  { id: 'ogimage', label: 'OG Image' },
  { id: 'diagnostics', label: 'Diagnostics' }
]

// Get site config
const siteConfig = useSiteConfig()

// Get locale info
const { locale, locales } = useI18n()

// Get router for current URL
const route = useRoute()

// Current URL
const currentUrl = computed(() => {
  if (import.meta.client) {
    return window.location.href
  }
  return `${siteConfig.url}${route.fullPath}`
})

// Canonical URL
const canonicalUrl = computed(() => {
  if (import.meta.client) {
    const canonical = document.querySelector('link[rel="canonical"]')
    return canonical?.getAttribute('href') || currentUrl.value
  }
  return currentUrl.value
})

// Type definitions
interface MetaTags extends Record<string, string | null | undefined> {
  title?: string | null
  description?: string | null
  robots?: string | null
  viewport?: string | null
  charset?: string | null
  author?: string | null
  keywords?: string | null
  generator?: string | null
  'theme-color'?: string | null
  'format-detection'?: string | null
  'color-scheme'?: string | null
}

interface LinkTag {
  rel: string
  href: string
  type?: string
  sizes?: string
  hreflang?: string
  crossorigin?: string
  as?: string
}

interface AlternateLink {
  rel: 'alternate'
  hreflang: string
  href: string
}

interface SeoIssue {
  id: string
  severity: 'error' | 'warning'
  title: string
  description: string
}

interface SchemaOrgData {
  '@context'?: string
  '@type'?: string | string[]
  [key: string]: unknown
}

// Reactive data that will be populated on client side
const schemaData = ref<SchemaOrgData | SchemaOrgData[] | string>('Loading...')
const metaTags = ref<MetaTags | string>('Loading...')
const ogTags = ref<Record<string, string | null>>({})
const twitterTags = ref<Record<string, string | null>>({})
const linkTags = ref<LinkTag[]>([])
const alternateLinks = ref<AlternateLink[]>([])
const ogImageUrl = ref<string>('')
const seoIssues = ref<SeoIssue[]>([])

// Robots info
const formattedRobotsInfo = computed(() => {
  const robotsConfig = {
    enabled: true,
    indexable: siteConfig.indexable,
    environment: siteConfig.env,
    rules: siteConfig.env === 'production' && siteConfig.url?.includes('konty.com')
      ? {
          allow: ['/'],
          disallow: ['/api/'],
          sitemap: '/sitemap_index.xml'
        }
      : {
          disallow: ['/']
        }
  }
  return JSON.stringify(robotsConfig, null, 2)
})

// Sitemap info
const formattedSitemapInfo = computed(() => {
  const sitemapConfig = {
    enabled: true,
    locales: locales.value.map(l => l.code),
    indexFile: '/sitemap_index.xml',
    sitemaps: locales.value.map(l => ({
      locale: l.code,
      url: `/sitemap_${l.code}.xml`
    })),
    sources: [
      '/api/__sitemap__/urls',
      '/api/__sitemap__/blog'
    ],
    cacheMaxAge: siteConfig.env === 'production' ? 3600 : 0
  }
  return JSON.stringify(sitemapConfig, null, 2)
})

// OG Image config
const formattedOgImageConfig = computed(() => {
  const ogConfig = {
    enabled: true,
    renderer: 'satori',
    fonts: [
      'Plus+Jakarta+Sans:400',
      'Plus+Jakarta+Sans:600',
      'Plus+Jakarta+Sans:700'
    ],
    defaults: {
      width: 1200,
      height: 630,
      cacheMaxAgeSeconds: 604800 // 7 days
    }
  }
  return JSON.stringify(ogConfig, null, 2)
})

// Computed properties for formatted output
const formattedSiteConfig = computed(() => {
  return JSON.stringify(siteConfig, null, 2)
})

const formattedLocaleInfo = computed(() => {
  return JSON.stringify({
    currentLocale: locale.value,
    availableLocales: locales.value.map(l => l.code),
    defaultLocale: locales.value.find(l => l.default)?.code
  }, null, 2)
})

const formattedSchemaData = computed(() => {
  if (typeof schemaData.value === 'string') {
    return schemaData.value
  }
  return JSON.stringify(schemaData.value, null, 2)
})

const formattedMetaTags = computed(() => {
  if (typeof metaTags.value === 'string') {
    return metaTags.value
  }
  return JSON.stringify(metaTags.value, null, 2)
})

const formattedOgTags = computed(() => {
  return JSON.stringify(ogTags.value, null, 2)
})

const formattedTwitterTags = computed(() => {
  return JSON.stringify(twitterTags.value, null, 2)
})

const formattedLinkTags = computed(() => {
  return JSON.stringify(linkTags.value, null, 2)
})

const formattedAlternateLinks = computed(() => {
  return JSON.stringify(alternateLinks.value, null, 2)
})

// Analyze SEO issues
const analyzeSeoIssues = () => {
  const issues: typeof seoIssues.value = []

  // Check site name
  if (!siteConfig.name) {
    issues.push({
      id: 'missing-site-name',
      severity: 'error',
      title: 'Missing site name',
      description: 'Site name is not configured. Add it to nuxt.config.ts or set dynamically via server plugin.'
    })
  }

  // Check site description
  if (!siteConfig.description) {
    issues.push({
      id: 'missing-site-description',
      severity: 'warning',
      title: 'Missing site description',
      description: 'Site description is not configured. This is used as default meta description.'
    })
  }

  // Check identity
  if (!siteConfig.identity) {
    issues.push({
      id: 'missing-identity',
      severity: 'warning',
      title: 'Missing organization identity',
      description: 'Organization identity is not configured. This is important for Knowledge Graph.'
    })
  }

  // Check meta title
  const title = typeof metaTags.value === 'string' ? document?.title : (metaTags.value?.title || document?.title)
  if (!title || title.length < 30) {
    issues.push({
      id: 'short-title',
      severity: 'warning',
      title: 'Title too short',
      description: `Page title should be 30-60 characters. Current: ${title?.length || 0} characters.`
    })
  }

  // Check meta description
  const description = typeof metaTags.value === 'string' ? undefined : metaTags.value?.description
  if (!description || description.length < 120) {
    issues.push({
      id: 'short-description',
      severity: 'warning',
      title: 'Description too short',
      description: `Meta description should be 120-160 characters. Current: ${description?.length || 0} characters.`
    })
  }

  // Check OG image
  if (!ogImageUrl.value) {
    issues.push({
      id: 'missing-og-image',
      severity: 'warning',
      title: 'Missing OG image',
      description: 'No Open Graph image detected. This reduces social media engagement.'
    })
  }

  // Check canonical URL
  if (!canonicalUrl.value) {
    issues.push({
      id: 'missing-canonical',
      severity: 'warning',
      title: 'Missing canonical URL',
      description: 'No canonical URL found. This can cause duplicate content issues.'
    })
  }

  seoIssues.value = issues
}

// Log detailed info to console
const logDetailedInfo = () => {
  console.group('🔍 SEO Debug - Detailed Information')

  console.group('📋 Site Configuration')
  console.log('Full Config:', siteConfig)
  console.log('URL:', siteConfig.url)
  console.log('Name:', siteConfig.name)
  console.log('Description:', siteConfig.description)
  console.log('Environment:', siteConfig.env)
  console.log('Indexable:', siteConfig.indexable)
  console.log('Identity:', siteConfig.identity)
  console.log('Business Metrics:', siteConfig.businessMetrics)
  console.groupEnd()

  console.group('🌍 Localization')
  console.log('Current Locale:', locale.value)
  console.log('Available Locales:', locales.value)
  console.log('Alternate Links:', alternateLinks.value)
  console.groupEnd()

  console.group('🏷️ Meta Tags')
  console.log('All Meta Tags:', metaTags.value)
  console.log('OG Tags:', ogTags.value)
  console.log('Twitter Tags:', twitterTags.value)
  console.groupEnd()

  console.group('📊 Structured Data')
  console.log('Schema.org:', schemaData.value)
  console.groupEnd()

  console.group('🤖 Technical SEO')
  console.log('Canonical URL:', canonicalUrl.value)
  console.log('Robots Meta:', typeof metaTags.value === 'string' ? undefined : metaTags.value?.robots)
  console.log('Link Tags:', linkTags.value)
  console.groupEnd()

  console.group('🖼️ OG Image')
  console.log('OG Image URL:', ogImageUrl.value)
  console.log('OG Title:', ogTags.value?.['og:title'])
  console.log('OG Description:', ogTags.value?.['og:description'])
  console.groupEnd()

  console.group('⚠️ SEO Issues')
  console.table(seoIssues.value)
  console.groupEnd()

  console.groupEnd()
}

// Only run on client side
if (import.meta.client) {
  onMounted(() => {
    // Get schema data from DOM
    try {
      const schemaScripts = document.querySelectorAll('script[type="application/ld+json"]')
      if (schemaScripts.length > 0) {
        const schemas = Array.from(schemaScripts).map(script => {
          try {
            return JSON.parse(script.textContent || '{}')
          } catch {
            return { error: 'Failed to parse schema' }
          }
        })
        schemaData.value = schemas.length === 1 ? schemas[0] : schemas
      } else {
        schemaData.value = { message: 'No schema.org data found in DOM' }
      }
    } catch (e: unknown) {
      console.error('Error accessing schema data:', e)
      schemaData.value = { error: 'Error accessing schema data' }
    }

    // Get all meta tags from DOM
    try {
      const metas = document.querySelectorAll('meta')
      const allTags: MetaTags = {}
      const og: Record<string, string | null> = {}
      const twitter: Record<string, string | null> = {}

      metas.forEach(meta => {
        const name = meta.getAttribute('name')
        const property = meta.getAttribute('property')
        const content = meta.getAttribute('content')

        if (name) {
          allTags[name] = content
          if (name.startsWith('twitter:')) {
            twitter[name] = content
          }
        }

        if (property) {
          allTags[property] = content
          if (property.startsWith('og:')) {
            og[property] = content
            if (property === 'og:image') {
              ogImageUrl.value = content || ''
            }
          }
        }
      })

      metaTags.value = allTags
      ogTags.value = og
      twitterTags.value = twitter
    } catch (e: unknown) {
      console.error('Error accessing meta tags:', e)
      metaTags.value = 'Error accessing meta tags'
    }

    // Get link tags
    try {
      const links = document.querySelectorAll('link')
      const linkData: LinkTag[] = []
      const alternates: AlternateLink[] = []

      links.forEach(link => {
        const rel = link.getAttribute('rel')
        const href = link.getAttribute('href')
        const hreflang = link.getAttribute('hreflang')

        if (rel === 'alternate' && hreflang && href) {
          alternates.push({
            rel: 'alternate',
            hreflang,
            href
          })
        } else if (rel && href) {
          const linkItem: LinkTag = {
            rel,
            href
          }
          const type = link.getAttribute('type')
          const sizes = link.getAttribute('sizes')
          const crossorigin = link.getAttribute('crossorigin')
          const as = link.getAttribute('as')

          if (type) linkItem.type = type
          if (sizes) linkItem.sizes = sizes
          if (crossorigin) linkItem.crossorigin = crossorigin
          if (as) linkItem.as = as

          linkData.push(linkItem)
        }
      })

      linkTags.value = linkData
      alternateLinks.value = alternates
    } catch (e: unknown) {
      console.error('Error accessing link tags:', e)
    }

    // Analyze SEO issues
    analyzeSeoIssues()

    // Initial console log
    console.log('🔍 SEO Debug Page Loaded - Click "Log Detailed Info to Console" for full analysis')
  })
}
</script>
