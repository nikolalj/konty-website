<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <ClientStoriesHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyClientStoriesList hydrate-on-visible />
    <LazySharedStatistics hydrate-on-idle />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.clientStories.title'),
  description: t('seo.clientStories.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.clientStories.hero.title'),
  description: t('pages.clientStories.hero.subtitle'),
  badge: t('pages.clientStories.badge'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.clientStories()])
</script>
