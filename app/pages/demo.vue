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
  title: t('demo.heading'),
  description: t('demo.subheading'),
  badge: t('demo.form.badge'),
  cta: t('demo.form.submit')
})
</script>
