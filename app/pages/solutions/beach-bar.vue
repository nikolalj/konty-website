<template>
  <div>
    <BeachBarHero />
    <LazyBeachBarTrustStrip hydrate-on-visible />
    <LazyBeachBarPainPoints hydrate-on-visible />
    <LazyBeachBarSolutionTiers hydrate-on-visible />
    <LazyBeachBarControlFeatures hydrate-on-visible />
    <LazyBeachBarAriaBridge hydrate-on-visible />
    <LazyBeachBarPricingFaq hydrate-on-visible />
    <LazyBeachBarFinalCta hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO
usePageSeo({
  title: t('seo.solutions.beachBar.title'),
  description: t('seo.solutions.beachBar.description')
})

// Schema.org
useSchemaOrg([
  schemas.solutionService('beach-bar'),
  schemas.faqSchema(useFaqSchema('pages.solutions.beachBar.faq'))
])

// OG Image
defineOgImage('Main', {
  title: t('pages.solutions.beachBar.hero.title'),
})
</script>
