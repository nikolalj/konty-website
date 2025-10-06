<template>
  <div>
    <!-- Solution-specific hero and overview -->
    <SolutionsOverview solution="grocerySupermarkets" />

    <!-- Reusable components -->
    <LazySharedClientList class="dark" product="retail" hydrate-on-visible />
    <LazySharedStatistics hydrate-on-visible />
    <LazySharedPricing product="retail" hydrate-on-visible />
    <LazySharedFAQ product="retail" hydrate-on-visible />
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
useSchemaOrg([schemas.solutionService('grocery-supermarkets')])

// OG Image
defineOgImageComponent('Main', {
  title: t('pages.solutions.grocerySupermarkets.hero.title'),
  description: t('pages.solutions.grocerySupermarkets.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('pages.solutions.grocerySupermarkets.hero.cta')
})
</script>
