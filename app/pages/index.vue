<template>
  <div>
    <!-- Above the fold - Load immediately -->
    <HomeHero />
    
    <!-- Below the fold - Lazy load these components -->
    <LazySharedClientList />
    <LazyHomeFeatures />
    <LazySharedTestimonials />
    <LazySharedStatistics />
    <LazySharedGetStarted />
    <LazySharedPricing />
    <LazySharedContactForm />
    <LazyHomeBlogPosts />
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
  cta: t('pages.home.hero.cta.primary')
})

// Schema.org structured data using module composables
// Organization schema is automatically added from site.identity
defineWebPage({
  name: t('seo.home.title'),
  description: t('seo.home.description')
})

// Use centralized FAQ schema
const faqQuestions = [
  { q: t('pages.products.faq.general.q1'), a: t('pages.products.faq.general.a1') }, // What is Konty?
  { q: t('pages.products.faq.general.q2'), a: t('pages.products.faq.general.a2') }, // Works offline?
  { q: t('pages.products.faq.general.q3'), a: t('pages.products.faq.general.a3') }, // How fast to start?
  { q: t('pages.products.faq.general.q4'), a: t('pages.products.faq.general.a4') }, // Fiscalization support?
  { q: t('pages.products.faq.general.q5'), a: t('pages.products.faq.general.a5') }, // Free trial?
  { q: t('pages.pricing.faq.pricing.q1'), a: t('pages.pricing.faq.pricing.a1') }, // How much?
  { q: t('pages.pricing.faq.pricing.q2'), a: t('pages.pricing.faq.pricing.a2') }  // Hidden costs?
]

useSchemaOrg([schemas.faqSchema(faqQuestions)])
</script>
