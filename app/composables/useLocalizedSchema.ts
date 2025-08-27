/**
 * Centralized Schema.org structured data management
 * Similar to useCustomSeoMeta but for schema markup
 */

interface SchemaOrgOptions {
  type: 'Organization' | 'LocalBusiness' | 'Service' | 'Product' | 'BreadcrumbList' | 'FAQ'
  serviceType?: 'pos-system' | 'implementation' | 'support' | 'training'
  customData?: Record<string, unknown>
}

// Geo coordinates for each locale
const GEO_COORDINATES = {
  me: { latitude: "42.4304", longitude: "19.2594" },  // Podgorica
  rs: { latitude: "44.7866", longitude: "20.4489" },  // Belgrade
  ba: { latitude: "43.8563", longitude: "18.4131" },  // Sarajevo
  us: { latitude: "40.7128", longitude: "-74.0060" }  // New York (HQ for US operations)
}

/**
 * Get localized contact information
 */
function getLocalizedContact() {
  const { t, locale, locales } = useI18n()
  const config = useRuntimeConfig()
  
  const phone = t('contact.info.phone')
  const email = t('contact.info.email').replace("{'@'}", "@")
  // Get individual address fields
  const address = {
    streetAddress: t('contact.info.structuredAddress.streetAddress'),
    addressLocality: t('contact.info.structuredAddress.addressLocality'),
    addressRegion: t('contact.info.structuredAddress.addressRegion'),
    postalCode: t('contact.info.structuredAddress.postalCode'),
    addressCountry: t('contact.info.structuredAddress.addressCountry')
  }
  const siteUrl = config.public.siteUrl || 'https://konty.com'
  
  // Get currency from locale configuration
  const currentLocale = (locales.value as Array<{code: string, currency?: string}>).find(l => l.code === locale.value)
  const currency = currentLocale?.currency || 'EUR'
  
  const geo = GEO_COORDINATES[locale.value] || GEO_COORDINATES.me
  const areaServed = t('schema.areaServed')
  const openingHours = t('schema.openingHours')
  
  return {
    phone,
    email,
    address,
    siteUrl,
    currency,
    geo,
    areaServed,
    openingHours,
    locale: locale.value,
    availableLanguage: locale.value === 'us' ? 'English' : 'Serbian'
  }
}

/**
 * Generate Organization schema
 */
function generateOrganizationSchema() {
  const { t } = useI18n()
  const { phone, email, address, siteUrl, areaServed, availableLanguage } = getLocalizedContact()
  
  return {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": t('schema.organization.name'),
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.svg`,
    "description": t('seo.home.description'),
    "sameAs": [
      "https://www.facebook.com/konty/",
      "https://www.linkedin.com/company/konty/"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": phone,
      "email": email,
      "contactType": t('schema.organization.contactType'),
      "areaServed": areaServed,
      "availableLanguage": availableLanguage
    },
    "address": {
      "@type": "PostalAddress",
      ...address
    }
  }
}

/**
 * Generate LocalBusiness schema
 */
function generateLocalBusinessSchema() {
  const { t } = useI18n()
  const { phone, email, address, siteUrl, geo, areaServed, openingHours } = getLocalizedContact()
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteUrl}/#localbusiness`,
    "name": t('schema.organization.name'),
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.svg`,
    "description": t('seo.home.description'),
    "telephone": phone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      ...address
    },
    "geo": {
      "@type": "GeoCoordinates",
      ...geo
    },
    "openingHours": [
      openingHours
    ],
    "sameAs": [
      "https://www.facebook.com/konty/",
      "https://www.linkedin.com/company/konty/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "POS Systems",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Konty Retail POS",
            "description": t('seo.kontyRetail.description')
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Konty Hospitality POS",
            "description": t('seo.kontyHospitality.description')
          }
        }
      ]
    },
    "areaServed": {
      "@type": "Country",
      "name": areaServed
    }
  }
}

/**
 * Generate Service schema
 */
function generateServiceSchema(serviceType: string = 'pos-system') {
  const { t } = useI18n()
  const { phone, email, address, siteUrl, currency, areaServed } = getLocalizedContact()
  
  const serviceSchemas = {
    'pos-system': {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteUrl}/#pos-service`,
      "name": t('nav.products'),
      "description": t('seo.products.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": t('schema.organization.name'),
        "url": siteUrl,
        "address": {
          "@type": "PostalAddress",
          ...address
        },
        "telephone": phone,
        "email": email
      },
      "serviceType": "Point of Sale System",
      "category": "Business Software Solutions",
      "areaServed": {
        "@type": "Country",
        "name": areaServed
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "POS Services",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Konty Retail POS",
              "description": t('seo.kontyRetail.description')
            },
            "priceCurrency": currency,
            "availability": "https://schema.org/InStock"
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Konty Hospitality POS",
              "description": t('seo.kontyHospitality.description')
            },
            "priceCurrency": currency,
            "availability": "https://schema.org/InStock"
          }
        ]
      },
      "offers": {
        "@type": "Offer",
        "url": `${siteUrl}/pricing`,
        "priceCurrency": currency,
        "availability": "https://schema.org/InStock",
        "validFrom": new Date().toISOString().split('T')[0]
      }
    },
    'implementation': {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": t('schema.services.implementation.name'),
      "description": t('schema.services.implementation.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": t('schema.organization.name'),
        "telephone": phone,
        "email": email
      },
      "serviceType": "Software Implementation",
      "category": "IT Services"
    },
    'support': {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": t('schema.services.support.name'),
      "description": t('schema.services.support.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": t('schema.organization.name'),
        "telephone": phone,
        "email": email
      },
      "serviceType": "Technical Support",
      "category": "Customer Support"
    },
    'training': {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": t('schema.services.training.name'),
      "description": t('schema.services.training.description'),
      "provider": {
        "@type": "LocalBusiness",
        "name": t('schema.organization.name'),
        "telephone": phone,
        "email": email
      },
      "serviceType": "Staff Training",
      "category": "Educational Services"
    }
  }
  
  return serviceSchemas[serviceType as keyof typeof serviceSchemas] || serviceSchemas['pos-system']
}

/**
 * Main composable function for Schema.org structured data
 * Similar to useCustomSeoMeta but for schema markup
 */
export const useLocalizedSchema = (options: SchemaOrgOptions) => {
  let schema: Record<string, unknown> | null = null
  
  switch (options.type) {
    case 'Organization':
      schema = generateOrganizationSchema()
      break
    case 'LocalBusiness':
      schema = generateLocalBusinessSchema()
      break
    case 'Service':
      schema = generateServiceSchema(options.serviceType)
      break
    default:
      console.warn(`Schema type ${options.type} not yet implemented`)
      return
  }
  
  // Merge with custom data if provided
  if (options.customData) {
    schema = { ...schema, ...options.customData }
  }
  
  // Add the schema to the page head
  useHead({
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(schema)
      }
    ]
  })
}