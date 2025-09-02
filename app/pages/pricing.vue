<template>
  <div class="py-12 sm:py-16">
    <shared-pricing heading-level="h1" />
    <shared-get-started />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n()

// Get current locale config for currency
const currentLocale = locales.value.find(l => l.code === locale.value)
const currency = currentLocale?.currencySymbol || '€'

// SEO meta tags
usePageSeo({
  title: t('seo.pricing.title'),
  description: t('seo.pricing.description')
})

// OG Image generation with localized pricing
defineOgImageComponent('Pricing', {
  title: t('pricing.title'),
  currency,
  period: t('pricing.period'),
  cta: t('pricing.trial.title'),
  ctaSubtext: t('pricing.trial.subtitle'),
  plans: [
    {
      name: t('pricing.plans.start.title'),
      price: t('pricing.plans.start.price'),
      badge: ''
    },
    {
      name: t('pricing.plans.standard.title'),
      price: t('pricing.plans.standard.price'),
      popular: true,
      badge: t('pricing.badge.popular')
    },
    {
      name: t('pricing.plans.premium.title'),
      price: t('pricing.plans.premium.price'),
      badge: ''
    }
  ]
})

// Schema.org structured data
defineWebPage({
  '@type': 'WebPage',
  name: t('seo.pricing.title'),
  description: t('seo.pricing.description')
})
</script>
