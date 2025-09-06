<template>
  <div>
    <products-headline />
    <shared-product-features product="kontyRetail" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
import { LOCALES } from '../../config/locale.config'

const { t, locale } = useI18n()

const currentLocale = LOCALES.find(l => l.code === locale.value)

// SEO meta tags
usePageSeo({
  title: t('seo.products.title'),
  description: t('seo.products.description')
})

// OG Image generation for Products overview
defineOgImageComponent('Main', {
  title: t('nav.products'),
  description: t('seo.products.description'),
  cta: t('hero.cta.primary')
})

// SoftwareApplication schema for product overview page
// Shows overall product info and free trial offer
useSchemaOrg([
  {
    '@type': 'SoftwareApplication',
    '@id': '#konty-pos',
    name: t('products.name'),
    description: t('seo.products.description'),
    applicationCategory: 'BusinessApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],

    // Free trial offer
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: currentLocale?.currency || 'EUR',
      name: t('pricing.freeTrial'),
      availability: 'https://schema.org/InStock'
    },

    // Overall product ratings
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '237',
      bestRating: '5'
    },

    // Link to organization
    publisher: {
      '@type': 'Organization',
      '@id': '#identity'
    }
  }
])
</script>
