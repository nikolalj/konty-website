<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <ContactHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyContactInfo hydrate-on-visible />
    <LazySharedClientList hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.contact.title'),
  description: t('seo.contact.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.contact.hero.title'),
  description: t('pages.contact.hero.subtitle'),
  cta: t('ui.forms.buttons.submit')
})

// Use centralized schema
useSchemaOrg([schemas.localBusiness()])
</script>
