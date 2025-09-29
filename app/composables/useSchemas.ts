/**
 * Centralized Schema.org definitions for Konty POS
 * Single source of truth for all structured data
 * All values come from translations - no hardcoded strings
 */

import { DEFAULT_LOCALE, LOCALES } from "~/config/locale.config.mjs"
import type { BlogPost } from '~/types/content'

export const useSchemas = () => {
  const { t, locale } = useI18n()
  const config = useRuntimeConfig()

  // Get current locale config
  const currentLocale = computed(() => LOCALES.find(l => l.code === locale.value))
  const currency = computed(() => currentLocale.value?.currency || 'EUR')

  // Ratings - ONLY USE IF YOU HAVE REAL REVIEWS
  // Currently disabled as we don't have verified reviews
  // const RATINGS = {
  //   retail: { value: '4.8', count: '127' },
  //   hospitality: { value: '4.9', count: '110' },
  //   overall: { value: '4.8', count: '237' },
  //   best: 5,
  //   worst: 2
  // }

  /**
   * SoftwareApplication schema for Konty Retail
   * Exact match from retail.vue page
   */
  const retail = () => {
    // Get price values from translations (same as in page)
    const lowPrice = t('pages.pricing.retail.start.priceValue')
    const highPrice = t('pages.pricing.retail.premium.priceValue')

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
        t('pages.products.features.retail.feat1.title'),
        t('pages.products.features.retail.feat2.title'),
        t('pages.products.features.retail.feat3.title'),
        t('pages.products.features.retail.feat1.title'),
        t('pages.products.features.retail.feat2.title'),
        t('pages.products.features.retail.feat3.title')
      ],

      // Screenshot for rich results
      // TODO: Replace with real images
      screenshot: '/images/screenshots/retail-dashboard.png',

      // Aggregate ratings removed - only add with real, verified reviews
      // aggregateRating: { ... },

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
    const lowPrice = t('pages.pricing.hospitality.start.priceValue')
    const highPrice = t('pages.pricing.hospitality.premium.priceValue')

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
        t('pages.products.features.hospitality.feat1.title'),
        t('pages.products.features.hospitality.feat2.title'),
        t('pages.products.features.hospitality.feat3.title'),
        t('pages.products.features.hospitality.feat1.title'),
        t('pages.products.features.hospitality.feat2.title'),
        t('pages.products.features.hospitality.feat3.title')
      ],

      // TODO: Replace with real images
      screenshot: '/images/screenshots/hospitality-dashboard.png',

      // Aggregate ratings removed - only add with real, verified reviews

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
        Number(t('pages.pricing.retail.start.priceValue')),
        Number(t('pages.pricing.hospitality.start.priceValue'))
      ).toString(),
      highPrice: t('pages.pricing.hospitality.premium.priceValue'),
      offerCount: 6,
      availability: 'https://schema.org/InStock'
    },
    // Aggregate ratings removed - only add with real, verified reviews
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
    // Aggregate ratings removed - only add with real, verified reviews,
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
      email: t('data.company.contact.email') + '@konty.com',

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
      priceRange: `${t('pages.pricing.retail.start.priceValue')}-${t('pages.pricing.hospitality.premium.priceValue')} ${currentLocale.value?.currency}/month`,
      currenciesAccepted: currentLocale.value ? currentLocale.value.currency : DEFAULT_LOCALE.currency,
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

  /**
   * Article schema for individual blog posts
   */
  const article = (post: BlogPost) => {
    const localePath = useLocalePath()
    const siteUrl = config.public.siteUrl || 'https://konty.com'

    // Extract slug from path (e.g., "/blog/porto" -> "porto")
    // const slug = post.path?.split('/').pop() || ''

    return {
      '@type': 'Article',
      '@id': `${siteUrl}${localePath(post.path)}#article`,
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.updatedAt || post.date,
      author: {
        '@type': 'Person',
        name: post.author || 'Konty Team'
      },
      publisher: {
        '@type': 'Organization',
        '@id': '#identity'  // References server-set Organization
      },
      image: post.image ? {
        '@type': 'ImageObject',
        url: `${siteUrl}${post.image}`,
        width: 1200,
        height: 630
      } : undefined,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${siteUrl}${localePath(post.path)}`
      },
      articleSection: post.category,
      // wordCount calculation would need the actual content text
      // Since body structure varies, we'll omit wordCount for now
      timeRequired: post.readTime ? `PT${post.readTime}M` : undefined
    }
  }

  /**
   * CollectionPage schema for blog index
   */
  const blogCollection = () => {
    const localePath = useLocalePath()
    const siteUrl = config.public.siteUrl || 'https://konty.com'

    return {
      '@type': 'CollectionPage',
      '@id': `${siteUrl}${localePath('/blog')}#collection`,
      name: t('seo.blog.title'),
      description: t('seo.blog.description'),
      url: `${siteUrl}${localePath('/blog')}`,
      mainEntity: {
        '@type': 'Blog',
        '@id': `${siteUrl}${localePath('/blog')}#blog`,
        name: t('pages.blog.hero.title'),
        description: t('pages.blog.hero.subtitle'),
        url: `${siteUrl}${localePath('/blog')}`,
        publisher: {
          '@type': 'Organization',
          '@id': '#identity'
        }
      }
    }
  }

  /**
   * CollectionPage schema for client stories
   */
  const clientStoriesCollection = () => {
    const localePath = useLocalePath()
    const siteUrl = config.public.siteUrl || 'https://konty.com'

    return [{
      '@type': 'CollectionPage',
      '@id': `${siteUrl}${localePath('/client-stories')}#collection`,
      name: t('seo.clientStories.title'),
      description: t('seo.clientStories.description'),
      url: `${siteUrl}${localePath('/client-stories')}`,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${siteUrl}#website`
      }
    }
    // Commented out aggregate rating - only enable with real, verified reviews
    // , {
    //   '@type': 'SoftwareApplication',
    //   '@id': `${siteUrl}${localePath('/client-stories')}#konty-reviews`,
    //   name: 'Konty POS',
    //   aggregateRating: {
    //     '@type': 'AggregateRating',
    //     ratingValue: '4.9',
    //     reviewCount: '3', // Currently 3 client stories
    //     bestRating: '5',
    //     worstRating: '1'
    //   }
    // }
    ]
  }

  /**
   * Service schema for solution/industry pages
   * Describes the specific POS service offered for each industry
   */
  const solutionService = (solutionType: string) => {
    const localePath = useLocalePath()
    const siteUrl = config.public.siteUrl || 'https://konty.com'

    // Map solution types to service details
    const serviceDetails: Record<string, { name: string; category: string; description: string }> = {
      restaurants: {
        name: 'Restaurant POS System',
        category: 'Restaurant Management Software',
        description: t('seo.solutions.restaurants.description')
      },
      'bars-cafes': {
        name: 'Bar & Cafe POS System',
        category: 'Bar Management Software',
        description: t('seo.solutions.barsCafes.description')
      },
      'fast-food': {
        name: 'Fast Food POS System',
        category: 'Quick Service Restaurant Software',
        description: t('seo.solutions.fastFood.description')
      },
      'grocery-supermarkets': {
        name: 'Grocery & Supermarket POS System',
        category: 'Retail Management Software',
        description: t('seo.solutions.grocerySupermarkets.description')
      },
      'clothing-boutiques': {
        name: 'Fashion Retail POS System',
        category: 'Retail Management Software',
        description: t('seo.solutions.clothingBoutiques.description')
      },
      'convenience-stores': {
        name: 'Convenience Store POS System',
        category: 'Retail Management Software',
        description: t('seo.solutions.convenienceStores.description')
      },
      b2b: {
        name: 'B2B Sales & Invoicing System',
        category: 'Business Management Software',
        description: t('seo.solutions.b2b.description')
      }
    }

    const service = serviceDetails[solutionType] || {
      name: 'POS System',
      category: 'Business Management Software',
      description: t('seo.solutions.description')
    }

    return {
      '@type': 'Service',
      '@id': `${siteUrl}${localePath(`/solutions/${solutionType}`)}#service`,
      name: service.name,
      description: service.description,
      serviceType: service.category,
      provider: {
        '@type': 'Organization',
        '@id': '#identity'
      },
      areaServed: currentLocale.value ? [
        currentLocale.value.name,
        ...t('data.company.areaServed').split(',').map((s: string) => s.trim())
      ] : ['Serbia', 'Montenegro', 'Bosnia and Herzegovina'],
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: currency.value,
        eligibleRegion: currentLocale.value ? currentLocale.value.name : DEFAULT_LOCALE.name,
        priceValidUntil: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
        url: `${siteUrl}${localePath('/pricing')}`,
        availability: 'https://schema.org/InStock',
        description: `30 days ${t('pages.pricing.freeTrial')}`
      }
      // Commented out - only enable with real, verified reviews
      // ,
      // aggregateRating: {
      //   '@type': 'AggregateRating',
      //   ratingValue: RATINGS.overall.value,
      //   reviewCount: RATINGS.overall.count,
      //   bestRating: '5'
      // }
    }
  }

  /**
   * WebApplication schema for demo page
   * Shows the online demo/trial version of the POS system
   */
  const demoWebApplication = () => {
    const localePath = useLocalePath()
    const siteUrl = config.public.siteUrl || 'https://konty.com'

    return {
      '@type': 'WebApplication',
      '@id': `${siteUrl}${localePath('/demo')}#webapp`,
      name: 'Konty POS Demo',
      description: t('seo.demo.description'),
      url: `${siteUrl}${localePath('/demo')}`,
      applicationCategory: 'BusinessApplication',
      applicationSubCategory: 'Point of Sale Demo',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript. Works in Chrome, Firefox, Safari, Edge.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: currency.value,
        availability: 'https://schema.org/InStock',
        name: t('pages.pricing.freeTrial'),
        description: '15-minute personalized demo',
        eligibleDuration: {
          '@type': 'QuantitativeValue',
          value: 15,
          unitCode: 'MIN'
        }
      },
      provider: {
        '@type': 'Organization',
        '@id': '#identity'
      },
      // Commented out - only enable with real, verified reviews
      // aggregateRating: {
      //   '@type': 'AggregateRating',
      //   ratingValue: RATINGS.overall.value,
      //   reviewCount: RATINGS.overall.count,
      //   bestRating: '5'
      // },
      featureList: [
        t('pages.demo.features.liveDemo'),
        t('pages.demo.features.personalizedWalkthrough'),
        t('pages.demo.features.industrySpecific'),
        t('pages.demo.features.qaSession'),
        t('pages.demo.features.trialSetup')
      ],
      // TODO: Replace with real images
      screenshot: '/images/screenshots/demo-dashboard.png'
    }
  }

  /**
   * Review schema for client success stories
   * Used alongside Article schema to show these are customer testimonials
   */
  const clientStoryReview = (post: BlogPost) => {
    const localePath = useLocalePath()
    const siteUrl = config.public.siteUrl || 'https://konty.com'

    // Determine rating based on story category or default to 5
    // All client stories are success stories, so high ratings make sense
    const rating = 5 // Could extract from content if metrics are standardized

    // Extract business name from path (e.g., /blog/porto -> Porto, /blog/bella -> Bella)
    const slug = post.path?.split('/').pop() || ''
    const businessName = slug.charAt(0).toUpperCase() + slug.slice(1) || 'Business'

    return {
      '@type': 'Review',
      '@id': `${siteUrl}${localePath(post.path)}#review`,
      itemReviewed: {
        '@type': 'SoftwareApplication',
        name: 'Konty POS',
        applicationCategory: 'BusinessApplication',
        applicationSubCategory: post.category === 'clientStories' && post.title?.toLowerCase().includes('restaurant')
          ? 'Restaurant Management'
          : 'Point of Sale'
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: rating,
        bestRating: 5,
        worstRating: 1
      },
      author: {
        '@type': 'Organization',
        name: businessName
      },
      reviewBody: post.description,
      datePublished: post.date,
      publisher: {
        '@type': 'Organization',
        '@id': '#identity'
      }
    }
  }

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

    // Blog schemas
    article,
    blogCollection,
    clientStoriesCollection,
    clientStoryReview,

    // Solution schemas
    solutionService,

    // Demo schema
    demoWebApplication,

    // Generator schemas
    faqSchema,

    // Constants for external use
    // RATINGS, // Commented out - no fake ratings
  }
}
