/**
 * Centralized Schema.org definitions for Konty POS
 * Single source of truth for all structured data
 * All values come from translations - no hardcoded strings
 */

import { LOCALES } from "~~/config/locale.config"

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
   * Exact match from konty-retail.vue page
   */
  const kontyRetail = () => {
    // Get price values from translations (same as in page)
    const lowPrice = t('pricing.retail.start.priceValue')
    const highPrice = t('pricing.retail.premium.priceValue')

    return {
      '@type': 'SoftwareApplication',
      '@id': '#konty-retail',
      name: t('products.retail.name'),
      description: t('seo.kontyRetail.description'),
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

      // Software requirements
      softwareRequirements: t('schema.requirements.software'),
      permissions: t('schema.permissions.retail'),

      // Key features list
      featureList: [
        t('features.retail.inventory.title'),
        t('features.retail.barcode.title'),
        t('features.retail.loyalty.title'),
        t('features.retail.multiLocation.title'),
        t('features.retail.analytics.title'),
        t('features.retail.offline.title')
      ],

      // Screenshot for rich results
      screenshot: t('schema.screenshots.retail'),

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
  const kontyHospitality = () => {
    const lowPrice = t('pricing.hospitality.start.priceValue')
    const highPrice = t('pricing.hospitality.premium.priceValue')

    return {
      '@type': 'SoftwareApplication',
      '@id': '#konty-hospitality',
      name: 'Konty Hospitality',
      description: t('seo.kontyHospitality.description'),
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

      screenshot: '/images/screenshots/konty-hospitality-dashboard.png',

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
    name: t('products.name'),
    description: t('seo.products.description'),
    brand: {
      '@type': 'Brand',
      name: 'Konty'
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: currency.value,
      lowPrice: Math.min(
        Number(t('pricing.retail.start.priceValue')),
        Number(t('pricing.hospitality.start.priceValue'))
      ).toString(),
      highPrice: t('pricing.hospitality.premium.priceValue'),
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
    name: t('products.name'),
    description: t('seo.products.description'),
    applicationCategory: 'BusinessApplication',
    operatingSystem: ['Windows', 'macOS', 'Linux', 'iOS', 'Android'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: currency.value,
      name: t('pricing.freeTrial'),
      availability: 'https://schema.org/InStock',
      description: `30 ${t('pricing.days')} ${t('pricing.freeTrial')}`
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
   * HowTo schema for setup guides
   */
  const howToSetup = () => ({
    '@type': 'HowTo',
    name: t('howto.setup.title'),
    description: t('howto.setup.description'),
    totalTime: 'PT5M',
    supply: [
      {
        '@type': 'HowToSupply',
        name: t('howto.setup.device')
      }
    ],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: t('howto.setup.step1'),
        text: t('howto.setup.step1')
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: t('howto.setup.step2'),
        text: t('howto.setup.step2')
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: t('howto.setup.step3'),
        text: t('howto.setup.step3')
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: t('howto.setup.step4'),
        text: t('howto.setup.step4')
      },
      {
        '@type': 'HowToStep',
        position: 5,
        name: t('howto.setup.step5'),
        text: t('howto.setup.step5')
      }
    ]
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
      name: t('company.tradeName'),
      url: config.public.siteUrl + localePath('/'),
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
      priceRange: `${t('pricing.retail.start.priceValue')}-${t('pricing.hospitality.premium.priceValue')} ${currentLocale.value?.currency}/month`,
      currenciesAccepted: currentLocale.value ? currentLocale.value.currency : 'EUR',
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
  }

  return {
    // Product schemas
    kontyRetail,
    kontyHospitality,
    productsOverview,
    pricingProduct,

    // Page schemas
    localBusiness,

    // Generator schemas
    faqSchema,
    howToSetup,

    // Constants for external use
    RATINGS,
  }
}
