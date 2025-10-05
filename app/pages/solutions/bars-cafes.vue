<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="barsCafes" />

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
  title: t('seo.solutions.barsCafes.title'),
  description: t('seo.solutions.barsCafes.description')
})

// Schema.org
useSchemaOrg([schemas.solutionService('bars-cafes')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.barsCafes.hero.title'),
  description: t('pages.solutions.barsCafes.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.barsCafes.hero.cta')
})
</script>
