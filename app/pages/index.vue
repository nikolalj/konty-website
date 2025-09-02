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
defineWebPage({
  name: t('seo.home.title'),
  description: t('seo.home.description')
})

// Organization schema (appears on homepage)
defineOrganization({
  name: 'Konty',
  logo: '/images/branding/logo-light.svg',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: t('contact.info.phone'),
    contactType: 'sales',
    email: t('contact.info.email')
  }
})
</script>
