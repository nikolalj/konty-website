<template>
  <div>
    <ProductsHero class="dark" />

    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />
    <LazySharedProductFeatures product="hospitality" reverse />
    <LazySharedProductFeatures product="retail" reverse style="padding-top: 0" />
    <LazySharedTestimonials hydrate-on-idle style="padding-top: 0" />
    <LazySharedGetStarted variant="alt" hydrate-on-visible />
    <LazySharedPricing hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.products.title'),
  description: t('seo.products.description')
})

// OG Image generation for Products overview
defineOgImageComponent('Main', {
  title: t('ui.navigation.main.products'),
  description: t('seo.products.description'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.productsOverview()])
</script>
