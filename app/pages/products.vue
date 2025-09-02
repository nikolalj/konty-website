<template>
  <div>
    <products-headline />
    <shared-product-features product="kontyRetail" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Use the new simplified SEO composable
usePageSeo({
  title: t('seo.products.title'),
  description: t('seo.products.description'),
  type: 'website'
})
</script>