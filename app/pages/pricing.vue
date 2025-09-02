<template>
  <div class="py-12 sm:py-16">
    <shared-pricing heading-level="h1" />
    <shared-get-started />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO meta tags
usePageSeo({
  title: t('seo.pricing.title'),
  description: t('seo.pricing.description'),
  type: 'website'
})

// Schema.org structured data
defineWebPage({
  '@type': 'WebPage',
  name: t('seo.pricing.title'),
  description: t('seo.pricing.description')
})
</script>
