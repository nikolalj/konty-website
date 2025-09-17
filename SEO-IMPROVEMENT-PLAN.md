# SEO Improvement Plan for Konty Website

## Executive Summary
This document outlines critical SEO improvements needed for the Konty POS website to achieve maximum search visibility and conversion rates. Priority items are marked as 🔴 CRITICAL, 🟡 IMPORTANT, or 🟢 NICE-TO-HAVE.

## 🔴 CRITICAL Issues (Fix Before Launch)

### 1. Sitemap & Indexing Issues
**Problem:** All lastmod dates are placeholder (2025-09-15), sitemap URLs show as `http://[:3000/`
**Impact:** Google won't know when content was updated, may not crawl efficiently
**Solution:**
```javascript
// Update /server/api/__sitemap__/urls.ts
const contentUpdates = {
  '/': new Date().toISOString(), // Use actual content update dates
  '/pricing': '2025-09-17', // Track when prices actually change
  // ... rest of pages with real dates
}
```

### 2. Missing Hreflang Tags for International SEO
**Problem:** No hreflang tags despite having 4 locales (RS, ME, BA, US)
**Impact:** Google won't understand locale relationships, may show wrong version
**Solution:**
```vue
// Add to usePageSeo composable
const localePath = useLocalePath()
const { locale } = useI18n()

useHead({
  link: [
    { rel: 'alternate', hreflang: 'sr-RS', href: `https://konty.com${localePath(route.path, 'rs')}` },
    { rel: 'alternate', hreflang: 'sr-ME', href: `https://konty.com${localePath(route.path, 'me')}` },
    { rel: 'alternate', hreflang: 'bs-BA', href: `https://konty.com${localePath(route.path, 'ba')}` },
    { rel: 'alternate', hreflang: 'en-US', href: `https://konty.com${localePath(route.path, 'us')}` },
    { rel: 'alternate', hreflang: 'x-default', href: `https://konty.com${localePath(route.path, 'rs')}` }
  ]
})
```

### 3. Canonical URL Management
**Problem:** No canonical URLs set, risk of duplicate content penalties
**Impact:** SEO juice diluted across multiple URLs
**Solution:**
```typescript
// Enhanced usePageSeo.ts
export const usePageSeo = (options: PageSeoOptions) => {
  const route = useRoute()
  const siteUrl = useRuntimeConfig().public.siteUrl
  const localePath = useLocalePath()

  const canonicalUrl = `${siteUrl}${localePath(route.path)}`

  useSeoMeta({
    // ... existing
    ogUrl: canonicalUrl,
    canonicalUrl
  })

  useHead({
    link: [{ rel: 'canonical', href: canonicalUrl }]
  })
}
```

### 4. Missing Twitter Card Tags
**Problem:** Only basic OG tags, no Twitter-specific tags
**Impact:** Poor appearance when shared on Twitter/X
**Solution:**
```typescript
// Add to usePageSeo
useSeoMeta({
  twitterCard: 'summary_large_image',
  twitterSite: '@kontypos',
  twitterCreator: '@kontypos',
  twitterTitle: options.title,
  twitterDescription: options.description,
  twitterImage: ogImageUrl // from defineOgImageComponent
})
```

### 5. Blog Implementation Not Active
**Problem:** Blog sitemap handler exists but returns empty array
**Impact:** Blog content won't be indexed
**Solution:**
```typescript
// /server/api/__sitemap__/blog.ts
export default defineSitemapEventHandler(async () => {
  const posts = await $fetch('/api/blog/posts')
  return posts.map(post => ({
    loc: `/blog/${post.slug}`,
    lastmod: post.updatedAt,
    _i18nTransform: true,
    priority: 0.6
  }))
})
```

## 🟡 IMPORTANT Issues (Launch Week 1)

### 6. Enhanced Meta Tags
**Add these to every page:**
```typescript
useSeoMeta({
  // Existing...

  // Additional important tags
  author: 'Konty POS',
  publisher: 'Konty',
  applicationName: 'Konty POS',
  referrer: 'origin-when-cross-origin',
  formatDetection: 'telephone=no', // Prevent auto-linking
  themeColor: '#1F6FE2', // Brand color

  // Open Graph additions
  ogSiteName: 'Konty POS',
  ogLocaleAlternate: ['sr_ME', 'bs_BA', 'en_US'],

  // Apple-specific
  appleMobileWebAppCapable: 'yes',
  appleMobileWebAppStatusBarStyle: 'default',
  appleMobileWebAppTitle: 'Konty POS'
})
```

### 7. Breadcrumb Schema Implementation
**Add to pages with hierarchy:**
```typescript
// In useSchemas composable
const breadcrumbSchema = (items: BreadcrumbItem[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url
  }))
})

// Usage in pages/products/retail/features.vue
useSchemaOrg([
  schemas.breadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' },
    { name: 'Retail', url: '/products/retail' },
    { name: 'Features', url: '/products/retail/features' }
  ])
])
```

### 8. Local Business Schema
**Critical for local SEO:**
```typescript
const localBusinessSchema = () => ({
  '@type': 'LocalBusiness',
  name: 'Konty POS',
  image: 'https://konty.com/images/konty-office.jpg',
  '@id': 'https://konty.com',
  url: 'https://konty.com',
  telephone: currentLocale.phone,
  priceRange: '€€',
  address: {
    '@type': 'PostalAddress',
    streetAddress: currentLocale.address.street,
    addressLocality: currentLocale.address.city,
    postalCode: currentLocale.address.postalCode,
    addressCountry: currentLocale.country
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: currentLocale.geo.lat,
    longitude: currentLocale.geo.lng
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '18:00'
  }
})
```

### 9. FAQ Schema on All Relevant Pages
**Implement on pricing, product, solution pages:**
```typescript
// Already exists in useSchemas, but underutilized
// Add to pricing.vue
const faqQuestions = [
  { q: t('pages.pricing.faq.q1'), a: t('pages.pricing.faq.a1') },
  { q: t('pages.pricing.faq.q2'), a: t('pages.pricing.faq.a2') },
  // ... all FAQ items
]
useSchemaOrg([schemas.faqSchema(faqQuestions)])
```

### 10. Performance Optimization
**Improve Core Web Vitals:**
```typescript
// nuxt.config.ts additions
nitro: {
  compressPublicAssets: {
    brotli: true,
    gzip: true
  },
  prerender: {
    crawlLinks: true,
    routes: [
      '/', '/pricing', '/demo',
      // Add all static routes for all locales
      '/me/', '/me/pricing', '/me/demo',
      '/ba/', '/ba/pricing', '/ba/demo',
      '/us/', '/us/pricing', '/us/demo'
    ]
  }
}
```

## 🟢 NICE-TO-HAVE Improvements

### 11. Enhanced Image SEO
```vue
<!-- Component wrapper for all images -->
<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :title="title || alt"
    :loading="loading"
    :width="width"
    :height="height"
    :sizes="sizes"
    @error="handleImageError"
  />
</template>

<script setup>
// Track broken images
const handleImageError = (e) => {
  console.error('Image failed to load:', e.target.src)
  // Report to analytics
}
</script>
```

### 12. JSON-LD Script Implementation
```vue
<!-- Add to app.vue or layout -->
<script type="application/ld+json" v-html="JSON.stringify(schemaData)"></script>
```

### 13. Search Action Schema
```typescript
const searchActionSchema = () => ({
  '@type': 'WebSite',
  url: 'https://konty.com/',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://konty.com/search?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
  }
})
```

### 14. Video Schema for Demo Videos
```typescript
const videoSchema = (video) => ({
  '@type': 'VideoObject',
  name: video.title,
  description: video.description,
  thumbnailUrl: video.thumbnail,
  uploadDate: video.uploadDate,
  duration: video.duration, // ISO 8601 format
  embedUrl: video.embedUrl
})
```

### 15. Review/Rating Schema
```typescript
// When you have real reviews
const aggregateRatingSchema = () => ({
  '@type': 'AggregateRating',
  ratingValue: '4.8',
  reviewCount: '127',
  bestRating: '5',
  worstRating: '1'
})
```

## Implementation Priority Matrix

| Task | Impact | Effort | Priority | Timeline |
|------|--------|--------|----------|----------|
| Hreflang tags | High | Low | 🔴 Critical | Before launch |
| Canonical URLs | High | Low | 🔴 Critical | Before launch |
| Fix sitemap dates | High | Low | 🔴 Critical | Before launch |
| Twitter cards | Medium | Low | 🔴 Critical | Before launch |
| Blog implementation | High | Medium | 🔴 Critical | Before launch |
| Breadcrumb schema | Medium | Low | 🟡 Important | Week 1 |
| Local business schema | High | Medium | 🟡 Important | Week 1 |
| FAQ schema expansion | Medium | Low | 🟡 Important | Week 1 |
| Enhanced meta tags | Low | Low | 🟡 Important | Week 1 |
| Core Web Vitals | High | High | 🟡 Important | Week 2 |
| Image SEO wrapper | Low | Medium | 🟢 Nice-to-have | Month 1 |
| Search action schema | Low | Low | 🟢 Nice-to-have | Month 1 |
| Video schema | Low | Medium | 🟢 Nice-to-have | When needed |

## Testing Checklist

### Pre-Launch
- [ ] Test all hreflang tags with hreflang checker tool
- [ ] Validate all canonical URLs
- [ ] Test sitemap in Google Search Console
- [ ] Verify robots.txt in production
- [ ] Test all schema markup with Google's Rich Results Test
- [ ] Check all OG images with Facebook Debugger
- [ ] Test Twitter cards with Card Validator
- [ ] Run PageSpeed Insights for all key pages
- [ ] Verify all meta tags with SEO browser extensions

### Post-Launch
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Core Web Vitals in Search Console
- [ ] Set up Google Search Console for all locales
- [ ] Monitor 404 errors and fix broken links
- [ ] Track organic traffic growth
- [ ] Monitor keyword rankings
- [ ] Check mobile usability reports
- [ ] Review crawl stats regularly

## Monitoring & Maintenance

### Weekly Tasks
- Update sitemap lastmod dates when content changes
- Check for new 404 errors
- Monitor Core Web Vitals
- Review search queries in GSC

### Monthly Tasks
- Update FAQ schema with new questions
- Add new blog posts to sitemap
- Review and update meta descriptions
- Check for duplicate content issues
- Audit internal linking structure

### Quarterly Tasks
- Full SEO audit
- Competitor analysis
- Schema markup review
- Performance optimization review
- Content gap analysis

## Success Metrics

### Technical SEO Health
- 100% pages indexed in Google
- 0 crawl errors
- <3s load time on all pages
- All Core Web Vitals in green

### Organic Performance
- 50% increase in organic traffic within 3 months
- Top 3 rankings for "POS sistem" + location keywords
- 30% of total traffic from organic search
- <2% bounce rate from organic traffic
- >3 min average session duration

### Rich Results
- FAQ rich snippets on pricing page
- Breadcrumb rich snippets on all pages
- Organization knowledge panel
- Star ratings in search results (when reviews added)

## Additional Notes

1. **Localization Priority**: Focus on Serbian market first (RS locale) as it's the default and likely highest volume
2. **Content Strategy**: The technical SEO is only half the battle - need consistent, high-quality content
3. **Link Building**: Consider partnerships with local business associations for backlinks
4. **Local Citations**: List Konty in relevant business directories for each country
5. **Schema Evolution**: As you add features (reviews, events, etc.), add corresponding schema markup

## Resources & Tools

- [Google Search Console](https://search.google.com/search-console)
- [Schema.org Validator](https://validator.schema.org/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Hreflang Tags Generator](https://www.aleydasolis.com/english/international-seo-tools/hreflang-tags-generator/)
- [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

---

*Document created: 2025-09-17*
*Priority: Execute all 🔴 CRITICAL items before launch*
*Review cycle: Weekly until launch, then monthly*