<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="barsCafes" />

    <!-- Reusable components -->
    <LazySharedClientList product="hospitality" hydrate-on-visible />
    <LazySharedStatistics hydrate-on-visible />
    <LazySharedPricing product="hospitality" hydrate-on-visible />
    <LazySharedFAQ product="hospitality" hydrate-on-visible />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()

// SEO
usePageSeo({
  title: t('seo.solutions.barsCafes.title'),
  description: t('seo.solutions.barsCafes.description')
})

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.barsCafes.hero.title'),
  description: t('pages.solutions.barsCafes.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.barsCafes.hero.cta')
})
</script>