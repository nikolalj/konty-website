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
import { useRuntimeConfig } from '#imports'
import { LOCALES } from '../../config/locale.config'

const { t, locale } = useI18n()
const { tArray, tObject } = useUtils()
const config = useRuntimeConfig()

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

// LocalBusiness schema for About/Contact page
// This helps with local SEO and "near me" searches
useSchemaOrg([
  defineLocalBusiness({
    // Required fields
    '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
    '@id': `${config.public.siteUrl}/#/schema/LocalBusiness/${locale.value}`,
    name: t('company.tradeName'),
    url: config.public.siteUrl,
    logo: `${config.public.siteUrl}/images/branding/logo-light.svg`,
    image: `${config.public.siteUrl}/images/branding/logo-light.svg`,
    description: t('seo.about.description'),

    // Contact information
    telephone: t('company.contact.phone'),
    email: t('company.contact.email'),

    // Physical address (required)
    address: {
      '@type': 'PostalAddress',
      streetAddress: t('company.address.street'),
      addressLocality: t('company.address.city'),
      addressRegion: t('company.address.region'),
      postalCode: t('company.address.postalCode'),
      addressCountry: t('company.address.countryCode')
    },

    // Geographic coordinates (recommended for local SEO)
    geo: {
      '@type': 'GeoCoordinates',
      latitude: Number(t('company.geo.latitude')),
      longitude: Number(t('company.geo.longitude'))
    },

    // Service area
    areaServed: tArray('company.areaServed'),

    // Business hours
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: t('company.businessHours.weekdays.opens'),
        closes: t('company.businessHours.weekdays.closes')
      }
    ],

    // Additional business details
    priceRange: '$$',
    currenciesAccepted: currentLocale ? currentLocale.currency : 'EUR',
    paymentAccepted: t('company.paymentAccepted'),
    knowsAbout: tArray('company.knowsAbout'),
    serviceType: 'Point of Sale Software',
    additionalType: 'https://schema.org/SoftwareApplication',

    // Social profiles (helps with Knowledge Graph)
    sameAs: Object.values(tObject('company.social')),

    // Business identifiers
    vatID: t('company.vatID'),
    taxID: t('company.vatID'),

    // Founding information
    foundingDate: t('company.foundingDate'),
    founder: {
      '@type': 'Person',
      name: t('company.founder')
    }
  })
])
</script>
