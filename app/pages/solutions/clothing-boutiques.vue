<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="clothingBoutiques" />

    <!-- Client List -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Features List -->
    <LazySolutionsFeaturesList
      solution="clothingBoutiques"
      hydrate-on-visible
    />

    <!-- Reusable components -->
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ category="clothing-boutiques" variant="alt" hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.clothingBoutiques.title'),
  description: t('seo.solutions.clothingBoutiques.description')
})

// Schema.org
useSchemaOrg([
  schemas.solutionService('clothing-boutiques'),
  schemas.faqSchema(useFaqSchema('pages.solutions.clothingBoutiques.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.clothingBoutiques.hero.title'),
  description: t('pages.solutions.clothingBoutiques.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.clothingBoutiques.hero.cta')
})
</script>
