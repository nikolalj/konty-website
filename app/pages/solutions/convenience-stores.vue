<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="convenienceStores" />

    <!-- Features List -->
    <LazySolutionsFeaturesList
      solution="convenienceStores"
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
  title: t('seo.solutions.convenienceStores.title'),
  description: t('seo.solutions.convenienceStores.description')
})

// Schema.org
useSchemaOrg([schemas.solutionService('convenience-stores')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.convenienceStores.hero.title'),
  description: t('pages.solutions.convenienceStores.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.convenienceStores.hero.cta')
})
</script>
