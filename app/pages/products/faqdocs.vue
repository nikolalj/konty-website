<template>
  <div>
    <LazySharedFAQ hydrate-on-visible />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

usePageSeo({
  title: t('seo.products.faqdocs.title'),
  description: t('seo.products.faqdocs.description')
})
</script>
