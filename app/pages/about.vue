<template>
  <div>
    <about-headline />
    <shared-client-list product="kontyRetail" />
    <about-contact-info />
    <div id="contact">
      <shared-contact-form />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

useCustomSeoMeta({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  type: 'website'
})
</script>
