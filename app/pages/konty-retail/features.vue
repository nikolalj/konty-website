<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <RetailFeaturesHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyRetailFeaturesList hydrate-on-visible />
    <LazySharedFAQ product="retail" hydrate-on-visible />
    <LazySharedTestimonials product="retail" hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.retail.features.title'),
  description: t('seo.retail.features.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.retail.features.hero.title'),
  description: t('pages.retail.features.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.retailFeatures()])
</script>
