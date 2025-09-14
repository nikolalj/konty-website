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
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description')
})

// OG Image generation for About page
defineOgImageComponent('Main', {
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  cta: t('ui.forms.buttons.submit')
})

// LocalBusiness schema for About/Contact page
// This helps with local SEO and "near me" searches
useSchemaOrg([schemas.localBusiness()])
</script>
