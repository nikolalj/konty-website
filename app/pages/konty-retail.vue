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
  description: t('seo.kontyRetail.description'),
  type: 'website'
})

// Product schema for retail POS
// Get currency from current locale
const { $i18n } = useNuxtApp()
const currency = $i18n.localeProperties.value?.currency || 'EUR'

// Get price values from translations
const lowPrice = t('pricing.retail.start.priceValue')
const highPrice = t('pricing.retail.premium.priceValue')

defineSoftwareApp({
  name: 'Konty Retail',
  description: t('seo.kontyRetail.description'),
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Windows, macOS, Linux, iOS, Android',
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: currency,
    lowPrice,
    highPrice
  }
})
</script>
