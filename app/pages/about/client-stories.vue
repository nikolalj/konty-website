<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <AboutClientStoriesHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazyAboutClientStoriesList hydrate-on-visible />
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
  title: t('seo.about.clientStories.title'),
  description: t('seo.about.clientStories.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.about.clientStories.hero.title'),
  description: t('pages.about.clientStories.hero.subtitle'),
  badge: t('pages.about.clientStories.badge'),
  cta: t('ui.cta.primary')
})

// Use centralized schema
useSchemaOrg([schemas.clientStories()])
</script>