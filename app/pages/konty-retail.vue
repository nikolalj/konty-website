<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <KontyRetailHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazySharedClientList product="kontyRetail" hydrate-on-visible />
    <LazySharedBenefits product="kontyRetail" hydrate-on-visible />
    <LazyKontyRetailFeatures hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility -->
    <LazySharedPricing product="kontyRetail" hydrate-on-visible />
    <LazySharedGetStarted product="kontyRetail" hydrate-on-idle />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.kontyRetail.title'),
  description: t('seo.kontyRetail.description')
})

// OG Image generation for Retail product
defineOgImageComponent('Product', {
  product: 'Konty Retail',
  title: t('pages.kontyRetail.hero.title'),
  features: [
    t('pages.products.features.retail.inventory.title'),
    t('pages.products.features.retail.customerInsights.title'),
    t('pages.products.features.retail.quickCheckout.title')
  ],
  cta: t('ui.cta.primary'),
  icon: '🛍️'
})

// Use centralized schema
useSchemaOrg([schemas.kontyRetail()])
</script>
