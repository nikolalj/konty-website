<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="generalStores" />

    <!-- Client List -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Features List -->
    <LazySolutionsFeaturesList
      solution="generalStores"
      hydrate-on-visible
    />

    <!-- Reusable components -->
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ category="general-stores" variant="alt" hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.generalStores.title'),
  description: t('seo.solutions.generalStores.description')
})

// Schema.org
useSchemaOrg([
  schemas.solutionService('general-stores'),
  schemas.faqSchema(useFaqSchema('pages.solutions.generalStores.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.generalStores.hero.title'),
  description: t('pages.solutions.generalStores.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.generalStores.hero.cta')
})
</script>
