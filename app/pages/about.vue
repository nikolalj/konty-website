<template>
  <div>
    <about-headline />
    <SchemaLocalBusiness />
    <shared-client-list product="kontyRetail" />
    <about-contact-info />
    <div id="contact">
      <shared-contact-form />
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// Use the new simplified SEO composable
usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  type: 'website'
})
</script>
