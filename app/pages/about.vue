<template>
  <div>
    <about-headline />
    <shared-client-list product="kontyRetail" />
    <about-contact-info />
    <div id="contact">
      <shared-contact-form />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LOCALES } from '../../config/locale.config'
import { getCompanyInfo } from '../../config/company.config'

const { t, locale } = useI18n()

const currentLocale = LOCALES.find(l => l.code === locale.value)

// SEO meta tags
usePageSeo({
  title: t('seo.about.title'),
  description: t('seo.about.description')
})

// OG Image generation for About page
defineOgImageComponent('Main', {
  title: t('seo.about.title'),
  description: t('seo.about.description'),
  cta: t('contact.form.submit')
})

// Get company info for current locale
const company = getCompanyInfo(locale.value)

// LocalBusiness schema for About/Contact page
// This helps with local SEO and "near me" searches
defineLocalBusiness({
  name: company.tradeName || 'Konty POS',
  image: '/images/branding/logo-light.svg',
  telephone: company.contact.phone,
  email: company.contact.email,

  address: {
    streetAddress: company.address.street,
    addressLocality: company.address.city,
    addressRegion: company.address.region || company.address.city,
    postalCode: company.address.postalCode,
    addressCountry: company.address.countryCode
  },

  // Business hours
  openingHoursSpecification: [
    {
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00'
    }
  ],

  // Service details
  priceRange: '$$',
  areaServed: company.areaServed,
  currenciesAccepted: currentLocale ? currentLocale.currencySymbol : undefined,
  paymentAccepted: 'Credit Card, Bank Transfer',

  sameAs: Object.values(company.social || {}).filter(Boolean)
})
</script>
