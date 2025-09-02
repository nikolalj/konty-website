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
  description: t('seo.kontyHospitality.description'),
  type: 'website'
})

// Product schema for hospitality POS
// Get currency from current locale
const { $i18n } = useNuxtApp()
const currency = $i18n.localeProperties.value?.currency || 'EUR'

// Get price values from translations
const lowPrice = t('pricing.hospitality.start.priceValue')
const highPrice = t('pricing.hospitality.premium.priceValue')

defineSoftwareApp({
  name: 'Konty Hospitality',
  description: t('seo.kontyHospitality.description'),
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
