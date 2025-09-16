<template>
  <div>
    <!-- Hero Section -->
    <SolutionsHero />

    <!-- Reusable components -->
    <LazySharedClientList hydrate-on-visible />
    <LazySharedStatistics hydrate-on-visible />

    <!-- Solutions Grid -->
    <LazySolutionsGrid hydrate-on-visible />

    <!-- Bottom sections -->
    <LazySharedPricing hydrate-on-visible />
    <LazySharedFAQ hydrate-on-visible />
    <LazySharedContactForm hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { tArray } = useUtils()

// SEO
usePageSeo({
  title: t('seo.solutions.title'),
  description: t('seo.solutions.description')
})

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.hero.title'),
  description: t('pages.solutions.hero.subtitle'),
  cta: t('pages.solutions.hero.cta')
})
</script>
