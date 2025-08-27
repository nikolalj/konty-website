<template>
  <div class="py-12 sm:py-16">
    <SchemaProductWithOffers />
    <SchemaFAQ category="pricing" />
    <shared-pricing heading-level="h1" />
    <shared-get-started />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useCustomSeoMeta({
  title: t('seo.pricing.title'),
  description: t('seo.pricing.description'),
  type: 'website'
})
</script>
