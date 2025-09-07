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
  title: t('pages.demo.demo.seeInAction'),
  description: t('pages.demo.demo.description'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.forms.buttons.requestDemo')
})
</script>
