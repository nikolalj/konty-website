<template>
  <div>
    <demo-headline />
    <demo-form />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO meta tags
usePageSeo({
  title: t('seo.demo.title'),
  description: t('seo.demo.description')
})

// OG Image generation for Demo page
defineOgImageComponent('Main', {
  title: t('demo.seeInAction'),
  description: t('demo.description'),
  badge: t('pricing.freeTrial'),
  cta: t('demo.requestDemo')
})
</script>
