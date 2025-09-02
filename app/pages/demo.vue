<template>
  <div>
    <demo-headline />
    <demo-form />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Use the new simplified SEO composable
usePageSeo({
  title: t('seo.demo.title'),
  description: t('seo.demo.description'),
  type: 'website'
})
</script>
