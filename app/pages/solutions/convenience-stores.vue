<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="convenienceStores" />

    <!-- Client List -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Features List -->
    <LazySolutionsFeaturesList
      solution="convenienceStores"
      hydrate-on-visible
    />

    <!-- Reusable components -->
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ category="convenience-stores" variant="alt" hydrate-on-visible />
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
useSchemaOrg([
  schemas.solutionService('convenience-stores'),
  schemas.faqSchema(useFaqSchema('pages.solutions.convenienceStores.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.convenienceStores.hero.title'),
  description: t('pages.solutions.convenienceStores.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.convenienceStores.hero.cta')
})
</script>
