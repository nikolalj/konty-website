<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <HomeHero class="dark" />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />
    <LazyHomeFeatures hydrate-on-visible />
    <LazySharedTestimonials hydrate-on-idle />
    <LazySharedGetStarted variant="alt" hydrate-on-visible />
    <LazySharedPricing hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />

    <!-- Far below fold - maximum delay -->
    <LazySharedBlogPosts class="mb-8" category="clientStories" hydrate-on-idle />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO meta tags
usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.home.hero.title'),
  description: t('pages.home.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Schema.org structured data using module composables
// Organization schema is automatically added from site.identity
defineWebPage({
  name: t('seo.home.title'),
  description: t('seo.home.description')
})
</script>
