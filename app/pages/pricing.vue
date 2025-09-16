<template>
  <div class="mt-24">
    <shared-pricing heading-level="h1" />
    <shared-get-started />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
import { LOCALES } from '~/config/locale.config.mjs'

const { t, locale } = useI18n()
const schemas = useSchemas()

const currentLocale = LOCALES.find(l => l.code === locale.value)

// SEO meta tags
usePageSeo({
  title: t('seo.pricing.title'),
  description: t('seo.pricing.description')
})

// OG Image generation with localized pricing
defineOgImageComponent('Pricing', {
  title: t('pages.pricing.title'),
  currency: currentLocale?.currencySymbol,
  period: t('pages.pricing.plans.retail.start.billingCycle'),
  cta: t('pages.pricing.freeTrial'),
  ctaSubtext: t('pages.pricing.plans.retail.start.button'),
  plans: [
    {
      name: t('pages.pricing.plans.retail.start.title'),
      price: t('pages.pricing.plans.retail.start.priceValue'),
      badge: ''
    },
    {
      name: t('pages.pricing.plans.retail.standard.title'),
      price: t('pages.pricing.plans.retail.standard.priceValue'),
      popular: true,
      badge: t('pages.pricing.plans.retail.standard.badge')
    },
    {
      name: t('pages.pricing.plans.retail.premium.title'),
      price: t('pages.pricing.plans.retail.premium.priceValue'),
      badge: ''
    }
  ]
})

// Use centralized schema
useSchemaOrg([schemas.pricingProduct()])
</script>
