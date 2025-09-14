<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <KontyHospitalityHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazySharedClientList product="kontyHospitality" hydrate-on-visible />
    <LazySharedBenefits product="kontyHospitality" hydrate-on-visible />
    <LazyKontyHospitalityFeatures hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility -->
    <LazySharedPricing product="kontyHospitality" hydrate-on-visible />
    <LazySharedGetStarted product="kontyHospitality" hydrate-on-idle />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyHospitality.title'),
  description: t('seo.kontyHospitality.description')
})

// OG Image generation for Hospitality product
defineOgImageComponent('Product', {
  product: 'Konty Hospitality',
  title: t('pages.kontyHospitality.hero.title'),
  features: [
    t('pages.products.features.hospitality.tableManagement.title'),
    t('pages.products.features.hospitality.kitchenDisplay.title'),
    t('pages.products.features.hospitality.staffManagement.title')
  ],
  cta: t('ui.cta.primary'),
  icon: '🍽️'
})

// Use centralized schema
useSchemaOrg([schemas.kontyHospitality()])
</script>
