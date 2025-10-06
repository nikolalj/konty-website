<template>
  <div>
    <ProductsHeadline />
    <LazySharedProductFeatures product="retail" />
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
