<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="b2b" />

    <!-- Client List -->
    <LazySharedClientList class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />

    <!-- Features List -->
    <LazySolutionsFeaturesList solution="b2b" hydrate-on-visible />

    <!-- Reusable components -->
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ category="b2b" variant="alt" hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.b2b.title'),
  description: t('seo.solutions.b2b.description')
})

// Schema.org
useSchemaOrg([
  schemas.solutionService('b2b'),
  schemas.faqSchema(useFaqSchema('pages.solutions.b2b.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.b2b.hero.title'),
  description: t('pages.solutions.b2b.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.b2b.hero.cta')
})
</script>
