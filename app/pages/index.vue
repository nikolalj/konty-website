<template>
  <div>
    <!-- Critical above-fold - hydrate immediately -->
    <HomeHero />

    <!-- Below-fold components - delay hydration, keep SSR -->
    <LazySharedClientList hydrate-on-visible />
    <LazyHomeFeatures hydrate-on-visible />
    <LazySharedTestimonials hydrate-on-idle />
    <LazySharedStatistics hydrate-on-idle />
    <LazySharedGetStarted hydrate-on-visible />

    <!-- Interactive components - hydrate on visibility for better UX -->
    <LazySharedPricing hydrate-on-visible />
    <LazySharedContactForm hydrate-on-visible />

    <!-- Far below fold - maximum delay -->
    <LazyHomeBlogPosts hydrate-on-idle />
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const schemas = useSchemas()

// SEO meta tags
usePageSeo({
  title: t('seo.home.title'),
  description: t('seo.home.description')
})

// OG Image generation
defineOgImageComponent('Main', {
  title: t('pages.home.hero.title'),
  description: t('pages.home.hero.subtitle'),
  badge: t('pages.pricing.freeTrial'),
  cta: t('ui.cta.primary')
})

// Schema.org structured data using module composables
// Organization schema is automatically added from site.identity
defineWebPage({
  name: t('seo.home.title'),
  description: t('seo.home.description')
})

// Use centralized FAQ schema
const faqQuestions = [
  { q: t('pages.products.faq.q1'), a: t('pages.products.faq.a1') }, // What is Konty?
  { q: t('pages.products.faq.q2'), a: t('pages.products.faq.a2') }, // Works offline?
  { q: t('pages.products.faq.q3'), a: t('pages.products.faq.a3') }, // How fast to start?
  { q: t('pages.products.faq.q4'), a: t('pages.products.faq.a4') }, // Fiscalization support?
  { q: t('pages.products.faq.q5'), a: t('pages.products.faq.a5') }, // Free trial?
  { q: t('pages.pricing.faq.pricing.q1'), a: t('pages.pricing.faq.pricing.a1') }, // How much?
  { q: t('pages.pricing.faq.pricing.q2'), a: t('pages.pricing.faq.pricing.a2') }  // Hidden costs?
]

useSchemaOrg([schemas.faqSchema(faqQuestions)])
</script>
