<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <HospitalityFeaturesHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyHospitalityFeaturesList hydrate-on-visible />
    <LazySharedFAQ product="hospitality" hydrate-on-visible />
    <LazySharedTestimonials product="hospitality" hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.hospitality.features.title'),
  description: t('seo.hospitality.features.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.hospitality.features.hero.title'),
  description: t('pages.hospitality.features.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.hospitalityFeatures()])
</script>
