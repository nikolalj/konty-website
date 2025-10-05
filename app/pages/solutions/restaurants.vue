<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="restaurants" />

    <!-- Reusable components -->
    <LazySharedClientList product="hospitality" hydrate-on-visible />
    <LazySharedStatistics hydrate-on-visible />
    <LazySharedPricing product="hospitality" hydrate-on-visible />
    <LazySharedFAQ product="hospitality" hydrate-on-visible />
     <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.restaurants.title'),
  description: t('seo.solutions.restaurants.description')
})

// Schema.org
useSchemaOrg([schemas.solutionService('restaurants')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.restaurants.hero.title'),
  description: t('pages.solutions.restaurants.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.restaurants.hero.cta')
})
</script>
