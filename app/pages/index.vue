<template>
  <div>
    <HomeHero />
    <SharedClientList />
    <HomeFeatures />
    <SharedTestimonials />
    <SharedStatistics />
    <SharedGetStarted />
    <SharedPricing />
    <SharedContactForm />
    <HomeBlogPosts />
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
  title: t('hero.title'),
  description: t('hero.subtitle'),
  badge: t('pricing.freeTrial'),
  cta: t('hero.cta.primary')
})

// Schema.org structured data using module composables
// Organization schema is automatically added from site.identity
defineWebPage({
  name: t('seo.home.title'),
  description: t('seo.home.description')
})

// Use centralized FAQ schema
const faqQuestions = [
  { q: t('faq.general.q1'), a: t('faq.general.a1') }, // What is Konty?
  { q: t('faq.general.q2'), a: t('faq.general.a2') }, // Works offline?
  { q: t('faq.general.q3'), a: t('faq.general.a3') }, // How fast to start?
  { q: t('faq.general.q4'), a: t('faq.general.a4') }, // Fiscalization support?
  { q: t('faq.general.q5'), a: t('faq.general.a5') }, // Free trial?
  { q: t('faq.pricing.q1'), a: t('faq.pricing.a1') }, // How much?
  { q: t('faq.pricing.q2'), a: t('faq.pricing.a2') }  // Hidden costs?
]

useSchemaOrg([schemas.faqSchema(faqQuestions)])
</script>
