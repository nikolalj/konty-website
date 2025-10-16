<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="b2b" />

    <!-- Features List -->
    <LazySolutionsFeaturesList solution="b2b" hydrate-on-visible />

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
  title: t('seo.solutions.b2b.title'),
  description: t('seo.solutions.b2b.description')
})

// Schema.org
useSchemaOrg([schemas.solutionService('b2b')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.b2b.hero.title'),
  description: t('pages.solutions.b2b.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.b2b.hero.cta')
})
</script>
