<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <ProductsHospitalityFeaturesHero />

    <!-- Feature Groups - visual feature showcase -->
    <LazyProductsFeatureGroupsList product="hospitality" hydrate-on-visible />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <!-- <LazyProductsHospitalityFeaturesList hydrate-on-visible /> -->
    <LazySharedFAQ category="hospitality" hydrate-on-visible />
    <LazySharedTestimonials product="hospitality" hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.products.hospitality.features.title'),
  description: t('seo.products.hospitality.features.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.products.hospitality.features.hero.title'),
  description: t('pages.products.hospitality.features.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.hospitalityFeatures()])
</script>
