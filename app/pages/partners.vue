<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <AboutPartnersHero />

    <!-- Existing partner logos -->
    <LazySharedClientList class="dark" hydrate-on-visible />

    <!-- Social proof - partner metrics -->
    <LazySharedStatistics class="dark !pt-0" hydrate-on-visible />

    <!-- Partner testimonials -->
    <LazySharedTestimonials hydrate-on-visible />

    <!-- Segmented solutions - Retail/Hospitality -->
    <LazySharedProductFeatures hydrate-on-visible />

    <!-- Why become a partner - benefits -->
    <LazySharedBenefits category="partners" variant="alt" hydrate-on-visible />

    <!-- Partnership process flow -->
    <LazyAboutPartnersFlow hydrate-on-visible />

    <!-- Partner support details -->
    <LazyAboutPartnersSupport variant="alt" hydrate-on-visible />

    <!-- Partner FAQ -->
    <LazySharedFAQ category="partners" hydrate-on-visible />

    <!-- Contact form -->
    <LazySharedContactForm variant="alt" hydrate-on-visible />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.partners.title'),
  description: t('seo.partners.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.partners.hero.title'),
  description: t('pages.partners.hero.subtitle'),
  cta: t('pages.partners.cta')
})

// Use centralized schema
useSchemaOrg([schemas.partners()])
</script>
