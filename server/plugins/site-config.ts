/**
 * Server plugin to inject company data into site config at runtime
 * This merges business/legal entity data with NuxtSEO site config
 * based on the current locale from i18n
 */
import { getCompanyInfo, BUSINESS_METRICS } from '../../config/company.config'
import { DEFAULT_LOCALE, VALID_LOCALES } from '../../config/locale.config'
import type { ValidLocale } from '../../app/types/locale'

export default defineNitroPlugin((nitroApp) => {
  // Hook into site config initialization for runtime updates
  nitroApp.hooks.hook('site-config:init', ({ event, siteConfig }) => {
    // Get the current locale from the URL path (i18n sets this)
    // The path will have the locale prefix (e.g., /me/pricing, /us/about)
    // or no prefix for default locale (rs)
    const path = event.node.req.url || ''
    const pathSegments = path.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]
    
    // Determine locale from URL structure
    const locale: ValidLocale = VALID_LOCALES.includes(firstSegment as ValidLocale) 
      ? firstSegment as ValidLocale 
      : DEFAULT_LOCALE
    
    // Get company info for the current locale
    const company = getCompanyInfo(locale)
    
    // Get the site URL from config or environment
    const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com'
    
    // Build the organization identity for Schema.org
    const identity = {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization-${locale}`,
      name: company.tradeName,
      legalName: company.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/branding/logo-light.svg`,
        width: 200,
        height: 60
      },
      url: siteUrl,
      
      // Social profiles for Knowledge Graph
      sameAs: Object.values(company.social || {}).filter(Boolean),
      
      // Contact information
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: company.contact.phone,
        email: company.contact.email,
        contactType: 'sales',
        areaServed: company.areaServed,
        availableLanguage: company.availableLanguage
      },
      
      // Physical address
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.region,
        postalCode: company.address.postalCode,
        addressCountry: company.address.countryCode
      },
      
      // Trust signals
      foundingDate: company.foundingDate,
      numberOfEmployees: company.numberOfEmployees ? {
        '@type': 'QuantitativeValue',
        minValue: company.numberOfEmployees.min,
        maxValue: company.numberOfEmployees.max
      } : undefined,
      
      // Areas of expertise
      knowsAbout: company.knowsAbout,
      
      // Business registration
      vatID: company.vatID,
      taxID: company.vatID,
      registrationNumber: company.registrationNumber,
      
      // Business type
      additionalType: 'https://schema.org/Corporation'
    }
    
    // Push locale-specific configuration to the site config stack
    // Note: currentLocale is automatically set by i18n module
    siteConfig.push({
      identity,
      businessMetrics: BUSINESS_METRICS
    })
  })
})