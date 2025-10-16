<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <ProductsRetailFeaturesHero />

    <!-- Feature Groups - visual feature showcase -->
    <LazyProductsFeatureGroupsList product="retail" hydrate-on-visible />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <!-- <LazyProductsRetailFeaturesList hydrate-on-visible /> -->
    <LazySharedFAQ category="retail" hydrate-on-visible />
    <LazySharedTestimonials product="retail" hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.products.retail.features.title'),
  description: t('seo.products.retail.features.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.products.retail.features.hero.title'),
  description: t('pages.products.retail.features.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.retailFeatures()])
</script>
