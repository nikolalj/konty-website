<template>
  <div>
    <SolutionsOverview solution="grocerySupermarkets" />
    <LazySharedClientList product="retail" class="dark" hydrate-on-visible />
    <LazySharedStatistics class="dark !pt-4" hydrate-on-visible />
    <LazySolutionsFeaturesList solution="grocerySupermarkets" hydrate-on-visible />
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ category="grocery-supermarkets" variant="alt" hydrate-on-visible />
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.grocerySupermarkets.title'),
  description: t('seo.solutions.grocerySupermarkets.description')
})

// Schema.org
useSchemaOrg([
  schemas.solutionService('grocery-supermarkets'),
  schemas.faqSchema(useFaqSchema('pages.solutions.grocerySupermarkets.faq'))
])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.grocerySupermarkets.hero.title'),
  description: t('pages.solutions.grocerySupermarkets.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.grocerySupermarkets.hero.cta')
})
</script>
