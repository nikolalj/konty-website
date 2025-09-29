<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <ProductsHospitalityHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazySharedClientList product="hospitality" hydrate-on-visible />
    <LazySharedBenefits product="hospitality" hydrate-on-visible />
    <LazyProductsHospitalityFeatures hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility -->
    <LazySharedPricing product="hospitality" hydrate-on-visible />
    <LazySharedGetStarted product="hospitality" hydrate-on-idle />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.products.hospitality.title'),
  description: t('seo.products.hospitality.description')
})

// OG Image generation for Hospitality product
defineOgImageComponent('Product', {
  product: 'Konty Hospitality',
  title: t('pages.products.hospitality.hero.title'),
  features: [
    t('pages.products.features.hospitality.feat1.title'),
    t('pages.products.features.hospitality.feat2.title'),
    t('pages.products.features.hospitality.feat3.title')
  ],
  cta: t('ui.cta.primary'),
  icon: '🍽️'
})

// Use centralized schema
useSchemaOrg([schemas.hospitality()])
</script>
