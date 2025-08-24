<template>
  <div>
    <products-headline />
    <shared-product-features product="kontyRetail" />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useCustomSeoMeta({
  title: t('seo.products.title'),
  description: t('seo.products.description'),
  type: 'website'
})
</script>