<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="fastFood" />

    <!-- Features List -->
    <LazySolutionsFeaturesList solution="fastFood" hydrate-on-visible />

    <!-- Reusable components -->
    <LazySharedClientList class="dark" product="hospitality" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />
    <LazySharedPricing product="hospitality" hydrate-on-visible />
    <LazySharedFAQ category="hospitality" hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.fastFood.title'),
  description: t('seo.solutions.fastFood.description')
})

// Schema.org
useSchemaOrg([schemas.solutionService('fast-food')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.fastFood.hero.title'),
  description: t('pages.solutions.fastFood.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.fastFood.hero.cta')
})
</script>
