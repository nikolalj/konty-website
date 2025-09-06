<template>
  <div>
    <konty-hospitality-hero />
    <shared-client-list product="kontyHospitality" />
    <shared-benefits product="kontyHospitality" />
    <konty-hospitality-features />
    <shared-pricing product="kontyHospitality" />
    <shared-get-started product="kontyHospitality" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyHospitality.title'),
  description: t('seo.kontyHospitality.description')
})

// OG Image generation for Hospitality product
defineOgImageComponent('Product', {
  product: 'Konty Hospitality',
  title: t('hospitalityPage.hero.title'),
  features: [
    t('features.hospitality.tableManagement.title'),
    t('features.hospitality.kitchenDisplay.title'),
    t('features.hospitality.staffManagement.title')
  ],
  cta: t('hero.cta.primary'),
  icon: '🍽️'
})

// Enhanced product schema for hospitality POS with rich snippets
// Get currency from current locale
const { $i18n } = useNuxtApp()
const currency = $i18n.localeProperties.value?.currency || 'EUR'

// Get price values from translations
const lowPrice = t('pricing.hospitality.start.priceValue')
const highPrice = t('pricing.hospitality.premium.priceValue')

// SoftwareApplication schema for rich snippets in search results
// This enables price ranges, ratings, and app details to show in Google
useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    '@id': '#konty-hospitality',
    name: 'Konty Hospitality',
    description: t('seo.kontyHospitality.description'),
    applicationCategory: 'BusinessApplication',
    applicationSubCategory: 'Restaurant Management',
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
    permissions: 'camera (for QR codes), storage, network, printer',

    // Key features for restaurants
    featureList: [
      'Table Management',
      'Kitchen Display System',
      'Waiter Management',
      'Online Ordering',
      'Reservation System',
      'Split Bills',
      'Offline Mode'
    ],

    // Screenshot for rich results
    screenshot: '/images/screenshots/konty-hospitality-dashboard.png',

    // Customer ratings for trust signals
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '110',
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
