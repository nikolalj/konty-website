<template>
  <div>
    <!-- Hero Section -->
    <SolutionsHero />

    <!-- Reusable components -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Solutions Grid -->
    <LazySolutionsGrid hydrate-on-visible />

    <!-- Bottom sections -->
    <LazySharedPricing hydrate-on-visible />
    <LazySharedFAQ hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.title'),
  description: t('seo.solutions.description')
})

// Schema.org - General service overview
useSchemaOrg([schemas.solutionService('')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.hero.title'),
  description: t('pages.solutions.hero.subtitle'),
  cta: t('pages.solutions.hero.cta')
})
</script>
