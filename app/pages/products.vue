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

// SoftwareApplication schema for better visibility in search
// Shows app details, compatibility, and ratings
defineSoftwareApp({
  name: t('products.name'),
  applicationCategory: 'BusinessApplication',
  operatingSystem: t('schema.requirements.minimal'),
  // Free trial as the primary offer
  offers: {
    '@type': 'Offer',
    price: 0,
    priceCurrency: currentLocale?.currency || t('common.currency'),
    availability: 'https://schema.org/InStock',
    priceValidUntil: new Date(new Date().setMonth(new Date().getMonth() + 12)).toISOString()
  },
  // Trust signals - critical for conversion
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 237,
    bestRating: 5
  }
})
</script>
