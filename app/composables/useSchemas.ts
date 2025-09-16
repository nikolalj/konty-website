/**
 * Centralized Schema.org definitions for Konty POS
 * Single source of truth for all structured data
 * All values come from translations - no hardcoded strings
 */

import { LOCALES } from "~/config/locale.config.mjs"

export const useSchemas = () => {
  const { t, locale } = useI18n()
  const config = useRuntimeConfig()

  // Get current locale config
  const currentLocale = computed(() => LOCALES.find(l => l.code === locale.value))
  const currency = computed(() => currentLocale.value?.currency || 'EUR')

  // Ratings - keeping as strings to match page implementations
  const RATINGS = {
    retail: { value: '4.8', count: '127' },
    hospitality: { value: '4.9', count: '110' },
    overall: { value: '4.8', count: '237' },
    best: 5,
    worst: 2
  }

  /**
   * SoftwareApplication schema for Konty Retail
   * Exact match from retail.vue page
   */
  const retail = () => {
    // Get price values from translations (same as in page)
    const lowPrice = t('pages.pricing.plans.retail.start.priceValue')
    const highPrice = t('pages.pricing.plans.retail.premium.priceValue')

    return {
      '@type': 'SoftwareApplication',
      '@id': '#retail',
      name: t('data.products.retail.name'),
      description: t('seo.products.retail.description'),
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Point of Sale',
      operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],

      // Pricing information for rich snippets
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: currency.value,
        lowPrice,
        highPrice,
        offerCount: 3,
        availability: 'https://schema.org/InStock',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
      },

      // Key features list
      featureList: [
        t('pages.products.features.retail.inventory.title'),
        'Barcode Scanner Integration',
        'Customer Loyalty Program',
        'Multi-Location Support',
        'Advanced Analytics Dashboard',
        'Offline Mode'
      ],

      // Screenshot for rich results
      screenshot: '/images/screenshots/retail-dashboard.png',

      // Customer ratings for trust signals
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: RATINGS.overall.value,
        reviewCount: RATINGS.overall.count,
        bestRating: RATINGS.best,
        worstRating: RATINGS.worst
      },

      // Publisher information
      publisher: {
        '@type': 'Organization',
        '@id': '#identity'  // Links to site-wide Organization identity
      }
    }
  }

  /**
   * SoftwareApplication schema for Konty Hospitality
   */
  const hospitality = () => {
    const lowPrice = t('pages.pricing.plans.hospitality.start.priceValue')
    const highPrice = t('pages.pricing.plans.hospitality.premium.priceValue')

    return {
      '@type': 'SoftwareApplication',
      '@id': '#hospitality',
      name: 'Konty Hospitality',
      description: t('seo.products.hospitality.description'),
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Restaurant Management',
      operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],

      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: currency.value,
        lowPrice,
        highPrice,
        offerCount: 3,
        availability: 'https://schema.org/InStock',
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
      },

      softwareRequirements: '2GB RAM minimum, Internet connection for cloud sync',
      permissions: 'camera (for QR codes), storage, network, printer',

      featureList: [
        'Table Management',
        'Kitchen Display System',
        'Waiter Management',
        'Online Ordering',
        'Reservation System',
        'Split Bills',
        'Offline Mode'
      ],

      screenshot: '/images/screenshots/hospitality-dashboard.png',

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '110',
        bestRating: '5',
        worstRating: '1'
      },

      publisher: {
        '@type': 'Organization',
        '@id': '#identity'
      }
    }
  }

  /**
   * Product schema for pricing page
   */
  const pricingProduct = () => ({
    '@type': 'Product',
    '@id': '#konty-pricing',
    name: t('data.products.name'),
    description: t('seo.products.description'),
    brand: {
      '@type': 'Brand',
      name: 'Konty'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency.value,
      lowPrice: Math.min(
        Number(t('pages.pricing.plans.retail.start.priceValue')),
        Number(t('pages.pricing.plans.hospitality.start.priceValue'))
      ).toString(),
      highPrice: t('pages.pricing.plans.hospitality.premium.priceValue'),
      offerCount: 6,
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATINGS.overall.value,
      reviewCount: RATINGS.overall.count,
      bestRating: '5'
    }
  })

  /**
   * SoftwareApplication schema for products overview page
   */
  const productsOverview = () => ({
    '@type': 'SoftwareApplication',
    '@id': '#konty-pos',
    name: t('data.products.name'),
    description: t('seo.products.description'),
    applicationCategory: 'BusinessApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: currency.value,
      name: t('pages.pricing.freeTrial'),
      availability: 'https://schema.org/InStock',
      description: `30 days ${t('pages.pricing.freeTrial')}`
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: RATINGS.overall.value,
      reviewCount: RATINGS.overall.count,
      bestRating: '5'
    },
    publisher: {
      '@type': 'Organization',
      '@id': '#identity'
    }
  })

  /**
   * FAQ schema generator
   */
  const faqSchema = (questions: Array<{ q: string; a: string }>) => ({
    '@type': 'FAQPage',
    mainEntity: questions.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  })

  /**
   * LocalBusiness schema for about page
   * Exact match from about.vue page
   */
  const localBusiness = () => {
    const { tArray, tObject } = useUtils()
    const localePath = useLocalePath()

    return defineLocalBusiness({
      '@type': ['Organization', 'LocalBusiness', 'ProfessionalService'],
      '@id': `${config.public.siteUrl}/#/schema/LocalBusiness/${locale.value}`,
      name: t('data.company.tradeName'),
      url: config.public.siteUrl + localePath('/'),
      logo: `${config.public.siteUrl}/images/branding/logo-light.svg`,
      image: `${config.public.siteUrl}/images/branding/logo-light.svg`,
      description: t('data.company.description'),

      // Contact information
      telephone: t('data.company.contact.phone'),
      email: t('data.company.contact.email'),

      // Physical address (required)
      address: {
        '@type': 'PostalAddress',
        streetAddress: t('data.company.address.street'),
        addressLocality: t('data.company.address.city'),
        addressRegion: t('data.company.address.region'),
        postalCode: t('data.company.address.postalCode'),
        addressCountry: t('data.company.address.countryCode')
      },

      // Geographic coordinates (recommended for local SEO)
      geo: {
        '@type': 'GeoCoordinates',
        latitude: Number(t('data.company.geo.latitude')),
        longitude: Number(t('data.company.geo.longitude'))
      },

      // Service area
      areaServed: tArray('data.company.areaServed'),

      // Business hours
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: t('data.company.businessHours.weekdays.opens'),
          closes: t('data.company.businessHours.weekdays.closes')
        }
      ],

      // Additional business details
      priceRange: `${t('pages.pricing.plans.retail.start.priceValue')}-${t('pages.pricing.plans.hospitality.premium.priceValue')} ${currentLocale.value?.currency}/month`,
      currenciesAccepted: currentLocale.value ? currentLocale.value.currency : 'EUR',
      paymentAccepted: t('data.company.paymentAccepted'),
      knowsAbout: tArray('data.company.knowsAbout'),
      serviceType: 'Point of Sale Software',
      additionalType: 'https://schema.org/SoftwareApplication',

      // Social profiles (helps with Knowledge Graph)
      sameAs: Object.values(tObject('data.company.social')),

      // Business identifiers
      vatID: t('data.company.vatID'),
      taxID: t('data.company.vatID'),

      // Founding information
      foundingDate: t('data.company.foundingDate'),
      founder: {
        '@type': 'Person',
        name: t('data.company.founder')
      }
    })
  }

  /**
   * Schema for Konty Hospitality Features page
   */
  const hospitalityFeatures = () => ({
    '@type': 'WebPage',
    name: t('seo.products.hospitality.features.title'),
    description: t('seo.products.hospitality.features.description')
  })

  /**
   * Schema for Konty Retail Features page
   */
  const retailFeatures = () => ({
    '@type': 'WebPage',
    name: t('seo.products.retail.features.title'),
    description: t('seo.products.retail.features.description')
  })

  /**
   * Schema for Client Stories page
   */
  const clientStories = () => ({
    '@type': 'WebPage',
    name: t('seo.clientStories.title'),
    description: t('seo.clientStories.description')
  })

  /**
   * Schema for Partners page
   */
  const partners = () => ({
    '@type': 'WebPage',
    name: t('seo.partners.title'),
    description: t('seo.partners.description')
  })

  return {
    // Product schemas
    retail,
    hospitality,
    productsOverview,
    pricingProduct,

    // Page schemas
    localBusiness,
    hospitalityFeatures,
    retailFeatures,
    clientStories,
    partners,

    // Generator schemas
    faqSchema,

    // Constants for external use
    RATINGS,
  }
}
