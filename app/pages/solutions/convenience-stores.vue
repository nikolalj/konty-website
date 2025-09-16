<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="convenienceStores" />

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
  title: t('seo.solutions.convenienceStores.title'),
  description: t('seo.solutions.convenienceStores.description')
})

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.convenienceStores.hero.title'),
  description: t('pages.solutions.convenienceStores.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.convenienceStores.hero.cta')
})
</script>