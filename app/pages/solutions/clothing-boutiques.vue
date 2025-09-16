<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="clothingBoutiques" />

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
  title: t('seo.solutions.clothingBoutiques.title'),
  description: t('seo.solutions.clothingBoutiques.description')
})

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.clothingBoutiques.hero.title'),
  description: t('pages.solutions.clothingBoutiques.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.clothingBoutiques.hero.cta')
})
</script>