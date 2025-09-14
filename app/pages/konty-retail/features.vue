<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <KontyRetailFeaturesHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyKontyRetailFeaturesList hydrate-on-visible />
    <LazySharedFAQ product="kontyRetail" hydrate-on-visible />
    <LazySharedTestimonials product="kontyRetail" hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyRetail.features.title'),
  description: t('seo.kontyRetail.features.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.kontyRetail.features.hero.title'),
  description: t('pages.kontyRetail.features.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.kontyRetailFeatures()])
</script>