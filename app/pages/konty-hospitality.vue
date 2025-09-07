<template>
  <div>
    <!-- Above the fold -->
    <KontyHospitalityHero />
    
    <!-- Below the fold - Lazy load -->
    <LazySharedClientList product="kontyHospitality" />
    <LazySharedBenefits product="kontyHospitality" />
    <LazyKontyHospitalityFeatures />
    <LazySharedPricing product="kontyHospitality" />
    <LazySharedGetStarted product="kontyHospitality" />
    <LazySharedContactForm />
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
  cta: t('pages.home.hero.cta.primary'),
  icon: '🍽️'
})

// Use centralized schema
useSchemaOrg([schemas.kontyHospitality()])
</script>
