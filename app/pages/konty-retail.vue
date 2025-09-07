<template>
  <div>
    <konty-retail-hero />
    <shared-client-list product="kontyRetail" />
    <shared-benefits product="kontyRetail" />
    <konty-retail-features />
    <shared-pricing product="kontyRetail" />
    <shared-get-started product="kontyRetail" />
    <shared-contact-form />
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
  cta: t('pages.home.hero.cta.primary'),
  icon: '🛍️'
})

// Use centralized schema
useSchemaOrg([schemas.kontyRetail()])
</script>
