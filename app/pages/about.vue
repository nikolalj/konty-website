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

// SEO meta tags
usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description')
})

// OG Image generation for About page
defineOgImageComponent('Main', {
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  cta: t('contact.form.submit')
})
</script>
