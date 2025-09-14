<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <KontyHospitalityFeaturesHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyKontyHospitalityFeaturesList hydrate-on-visible />
    <LazySharedFAQ product="kontyHospitality" hydrate-on-visible />
    <LazySharedTestimonials product="kontyHospitality" hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyHospitality.features.title'),
  description: t('seo.kontyHospitality.features.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.kontyHospitality.features.hero.title'),
  description: t('pages.kontyHospitality.features.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.kontyHospitalityFeatures()])
</script>