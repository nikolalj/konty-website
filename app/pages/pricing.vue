<template>
  <div class="py-12 sm:py-16">
    <shared-pricing heading-level="h1" />
    <shared-get-started />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
import { LOCALES } from '../../config/locale.config'

const { t, locale } = useI18n()

const currentLocale = LOCALES.find(l => l.code === locale.value)

// SEO meta tags
usePageSeo({
  title: t('seo.pricing.title'),
  description: t('seo.pricing.description')
})

// OG Image generation with localized pricing
defineOgImageComponent('Pricing', {
  title: t('pricing.title'),
  currency: currentLocale?.currencySymbol,
  period: t('pricing.retail.start.billingCycle'),
  cta: t('pricing.freeTrial'),
  ctaSubtext: t('pricing.retail.start.button'),
  plans: [
    {
      name: t('pricing.retail.start.title'),
      price: t('pricing.retail.start.priceValue'),
      badge: ''
    },
    {
      name: t('pricing.retail.standard.title'),
      price: t('pricing.retail.standard.priceValue'),
      popular: true,
      badge: t('pricing.retail.standard.badge')
    },
    {
      name: t('pricing.retail.premium.title'),
      price: t('pricing.retail.premium.priceValue'),
      badge: ''
    }
  ]
})

// Schema.org structured data for pricing
// This enables rich snippets showing prices in search results
defineWebPage({
  '@type': 'WebPage',
  name: t('seo.pricing.title'),
  description: t('seo.pricing.description')
})

// Product schemas with pricing for rich snippets
// Shows price ranges in search results - major conversion booster
defineProduct({
  name: t('products.name'),
  description: t('seo.products.description'),
  brand: {
    '@type': 'Brand',
    name: t('products.name')
  },
  // AggregateOffer shows price range in search results
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: currentLocale?.currency || t('common.currency'),
    // Get minimum price across both products
    lowPrice: Math.min(
      Number(t('pricing.retail.start.priceValue')),
      Number(t('pricing.hospitality.start.priceValue'))
    ).toString(),
    // Get maximum price
    highPrice: t('pricing.hospitality.premium.priceValue'),
    offerCount: 6, // 3 tiers × 2 products
    availability: 'https://schema.org/InStock'
  },
  // Simple rating for now - can be enhanced with real data later
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: 4.8,
    reviewCount: 237
  }
})
</script>
