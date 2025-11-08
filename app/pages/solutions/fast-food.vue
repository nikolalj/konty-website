<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="fastFood" />

    <!-- Client List -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Features List -->
    <LazySolutionsFeaturesList solution="fastFood" hydrate-on-visible />

    <!-- Reusable components -->
    <LazySharedPricing product="hospitality" hydrate-on-visible />
    <LazySharedFAQ category="fast-food" variant="alt" hydrate-on-visible />
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
useSchemaOrg([
  schemas.solutionService('fast-food'),
  schemas.faqSchema(useFaqSchema('pages.solutions.fastFood.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.fastFood.hero.title'),
  description: t('pages.solutions.fastFood.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.fastFood.hero.cta')
})
</script>
