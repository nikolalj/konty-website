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
// Organization schema is automatically added from site.identity
defineWebPage({
  name: t('seo.home.title'),
  description: t('seo.home.description')
})

// FAQ Schema - Critical for conversion (50%+ CTR boost)
// Shows Q&A directly in search results
useSchemaOrg([
  {
    '@type': 'FAQPage',
    mainEntity: [
      // Top conversion questions - addressing main concerns
      {
        '@type': 'Question',
        name: t('faq.general.q1'), // What is Konty?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.general.a1')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.general.q2'), // Works offline?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.general.a2')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.general.q3'), // How fast to start?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.general.a3')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.general.q4'), // Fiscalization support?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.general.a4')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.general.q5'), // Free trial?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.general.a5')
        }
      },
      // Pricing FAQs - address cost concerns
      {
        '@type': 'Question',
        name: t('faq.pricing.q1'), // How much?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.pricing.a1')
        }
      },
      {
        '@type': 'Question',
        name: t('faq.pricing.q2'), // Hidden costs?
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('faq.pricing.a2')
        }
      }
    ]
  }
])
</script>
