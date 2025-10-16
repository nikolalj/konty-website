<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="clothingBoutiques" />

    <!-- Features List -->
    <LazySolutionsFeaturesList
      solution="clothingBoutiques"
      hydrate-on-visible
    />

    <!-- Reusable components -->
    <LazySharedClientList class="dark" product="retail" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ category="retail" hydrate-on-visible />
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
useSchemaOrg([schemas.solutionService('clothing-boutiques')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.clothingBoutiques.hero.title'),
  description: t('pages.solutions.clothingBoutiques.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.clothingBoutiques.hero.cta')
})
</script>
