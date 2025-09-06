<template>
  <div>
    <konty-retail-hero />
    <shared-client-list product="kontyRetail" />
    <shared-benefits product="kontyRetail" />
    <konty-retail-features />
    <shared-pricing product="kontyRetail" />
    <shared-get-started product="kontyRetail" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyRetail.title'),
  description: t('seo.kontyRetail.description')
})

// OG Image generation for Retail product
defineOgImageComponent('Product', {
  product: 'Konty Retail',
  title: t('retailPage.hero.title'),
  features: [
    t('features.retail.inventory.title'),
    t('features.retail.customerInsights.title'),
    t('features.retail.quickCheckout.title')
  ],
  cta: t('hero.cta.primary'),
  icon: '🛍️'
})

// Enhanced product schema for retail POS with rich snippets
// Get currency from current locale
const { $i18n } = useNuxtApp()
const currency = $i18n.localeProperties.value?.currency || 'EUR'

// Get price values from translations
const lowPrice = t('pricing.retail.start.priceValue')
const highPrice = t('pricing.retail.premium.priceValue')

// SoftwareApplication schema for rich snippets in search results
// This enables price ranges, ratings, and app details to show in Google
useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    '@id': '#konty-retail',
    name: 'Konty Retail',
    description: t('seo.kontyRetail.description'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Point of Sale',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],

    // Pricing information for rich snippets
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency,
      lowPrice,
      highPrice,
      offerCount: 3,
      availability: 'https://schema.org/InStock',
      priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    },

    // Software requirements
    softwareRequirements: '2GB RAM minimum, Internet connection for cloud sync',
    permissions: 'camera (for barcode scanning), storage, network',

    // Key features list
    featureList: [
      'Inventory Management',
      'Barcode Scanning',
      'Customer Loyalty Programs',
      'Multi-location Support',
      'Real-time Analytics',
      'Offline Mode'
    ],

    // Screenshot for rich results
    screenshot: '/images/screenshots/konty-retail-dashboard.png',

    // Customer ratings for trust signals
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1'
    },

    // Publisher information
    publisher: {
      '@type': 'Organization',
      '@id': '#identity'  // Links to site-wide Organization identity
    }
  }
])
</script>
