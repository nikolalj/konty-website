<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <AboutContactHero />

    <!-- Social proof section - client logos and statistics -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm variant="alt" hydrate-on-visible />
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
