<template>
  <div class="py-12 sm:py-16">
    <shared-pricing heading-level="h1" />
    <shared-get-started />
    <shared-contact-form />
  </div>
</template>

<script setup lang="ts">
import { LOCALES } from '../../config/locale.config'

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
  title: t('pricing.title'),
  currency: currentLocale?.currencySymbol,
  period: t('pricing.retail.start.billingCycle'),
  cta: t('pricing.freeTrial'),
  ctaSubtext: t('pricing.retail.start.button'),
  plans: [
    {
      name: t('pricing.retail.start.title'),
      price: t('pricing.retail.start.priceValue'),
      badge: ''
    },
    {
      name: t('pricing.retail.standard.title'),
      price: t('pricing.retail.standard.priceValue'),
      popular: true,
      badge: t('pricing.retail.standard.badge')
    },
    {
      name: t('pricing.retail.premium.title'),
      price: t('pricing.retail.premium.priceValue'),
      badge: ''
    }
  ]
})

// Use centralized schema
useSchemaOrg([schemas.pricingProduct()])
</script>
