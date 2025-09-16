<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <ProductsRetailHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazySharedClientList product="retail" hydrate-on-visible />
    <LazySharedBenefits product="retail" hydrate-on-visible />
    <LazyProductsRetailFeatures hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility -->
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedGetStarted product="retail" hydrate-on-idle />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.products.retail.title'),
  description: t('seo.products.retail.description')
})

// OG Image generation for Retail product
defineOgImageComponent('Product', {
  product: 'Konty Retail',
  title: t('pages.products.retail.hero.title'),
  features: [
    t('pages.products.features.retail.inventory.title'),
    t('pages.products.features.retail.customerInsights.title'),
    t('pages.products.features.retail.quickCheckout.title')
  ],
  cta: t('ui.cta.primary'),
  icon: '🛍️'
})

// Use centralized schema
useSchemaOrg([schemas.retail()])
</script>
