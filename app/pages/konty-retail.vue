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

// Define the software application with comprehensive details
defineSoftwareApp({
  name: 'Konty Retail',
  description: t('seo.kontyRetail.description'),
  applicationCategory: 'BusinessApplication',
  applicationSubCategory: 'Point of Sale',
  operatingSystem: 'Windows, macOS, Linux, iOS, Android',
  
  // Enhanced offer details for rich snippets
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: currency,
    lowPrice,
    highPrice,
    offerCount: 3, // Three pricing tiers
    availability: 'https://schema.org/InStock',
    priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
    
    // Individual offers for each tier
    offers: [
      {
        '@type': 'Offer',
        name: t('pricing.retail.start.title'),
        price: t('pricing.retail.start.priceValue'),
        priceCurrency: currency,
        description: t('pricing.retail.start.description')
      },
      {
        '@type': 'Offer', 
        name: t('pricing.retail.standard.title'),
        price: t('pricing.retail.standard.priceValue'),
        priceCurrency: currency,
        description: t('pricing.retail.standard.description')
      },
      {
        '@type': 'Offer',
        name: t('pricing.retail.premium.title'),
        price: t('pricing.retail.premium.priceValue'),
        priceCurrency: currency,
        description: t('pricing.retail.premium.description')
      }
    ]
  },
  
  // Software requirements
  softwareRequirements: '2GB RAM minimum, Internet connection for cloud sync',
  permissions: 'camera (for barcode scanning), storage, network',
  
  // Features
  featureList: [
    'Inventory Management',
    'Barcode Scanning',
    'Customer Loyalty Programs',
    'Multi-location Support',
    'Real-time Analytics',
    'Offline Mode'
  ],
  
  // Screenshots (if available)
  screenshot: '/images/screenshots/konty-retail-dashboard.png',
  
  // Ratings (using business metrics)
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 127,
    bestRating: 5,
    worstRating: 1
  },
  
  // Publisher info
  author: {
    '@type': 'Organization',
    name: 'Konty d.o.o.',
    url: 'https://konty.com'
  }
})
</script>
