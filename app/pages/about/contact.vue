<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <AboutContactHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyAboutContactInfo hydrate-on-visible />
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
  title: t('seo.about.contact.title'),
  description: t('seo.about.contact.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.about.contact.hero.title'),
  description: t('pages.about.contact.hero.subtitle'),
  cta: t('ui.forms.buttons.submit')
})

// Use centralized schema
useSchemaOrg([schemas.localBusiness()])
</script>