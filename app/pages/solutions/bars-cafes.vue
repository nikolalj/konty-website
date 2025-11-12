<template>
  <div>
    <SolutionsOverview solution="barsCafes" />
    <LazySharedClientList product="hospitality" class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />
    <LazySolutionsFeaturesList solution="barsCafes" hydrate-on-visible />
    <LazySharedPricing product="hospitality" hydrate-on-visible />
    <LazySharedFAQ category="bars-cafes" variant="alt" hydrate-on-visible />
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
useSchemaOrg([
  schemas.solutionService('bars-cafes'),
  schemas.faqSchema(useFaqSchema('pages.solutions.barsCafes.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.barsCafes.hero.title'),
  description: t('pages.solutions.barsCafes.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.barsCafes.hero.cta')
})
</script>
