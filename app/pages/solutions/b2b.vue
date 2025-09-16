<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="b2b" />

    <!-- Reusable components -->
    <LazySharedClientList product="retail" hydrate-on-visible />
    <LazySharedStatistics hydrate-on-visible />
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ product="retail" hydrate-on-visible />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO
usePageSeo({
  title: t('seo.solutions.b2b.title'),
  description: t('seo.solutions.b2b.description')
})

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.b2b.hero.title'),
  description: t('pages.solutions.b2b.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.b2b.hero.cta')
})
</script>