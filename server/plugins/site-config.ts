/**
 * Server plugin to inject company data into site config at runtime
 * Reads company data from translation files and builds Organization schema
 */
import { DEFAULT_LOCALE, VALID_LOCALES } from '../../config/locale.config'
import type { ValidLocale } from '../../app/types/locale'

interface CompanyData {
  legalName: string
  tradeName: string
  vatID?: string
  registrationNumber?: string
  foundingDate?: string
  address?: {
    street: string
    city: string
    region?: string
    postalCode: string
    country?: string
    countryCode: string
  }
  contact?: {
    phone: string
    email: string
    supportEmail?: string
    salesEmail?: string
  }
  social?: {
    facebook?: string
    linkedin?: string
    twitter?: string
    instagram?: string
  }
  numberOfEmployees?: {
    min: number
    max: number
  }
  knowsAbout?: string[]
  availableLanguage?: string[]
  areaServed?: string[]
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('site-config:init', async ({ event, siteConfig }) => {
    // Get the current locale from the URL path
    const path = event.node.req.url || ''
    const pathSegments = path.split('/').filter(Boolean)
    const firstSegment = pathSegments[0]

    const locale: ValidLocale = VALID_LOCALES.includes(firstSegment as ValidLocale)
      ? firstSegment as ValidLocale
      : DEFAULT_LOCALE.code

    // Load company data from translation file
    let company: CompanyData | undefined
    try {
      const translations = await import(`../../app/locales/${locale}.json`)
      company = translations.company as CompanyData
    } catch {
      console.warn(`Failed to load company data for locale ${locale}`)
      return
    }

    if (!company) {
      console.warn(`No company data found for locale ${locale}`)
      return
    }

    const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com'

    // Build Organization schema from translation data
    const identity = {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization-${locale}`,
      name: company.tradeName,
      legalName: company.legalName,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/images/branding/logo-light.svg`,
        width: 213,
        height: 107
      },
      url: siteUrl,
      sameAs: Object.values(company.social || {}).filter(Boolean),
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: company.contact?.phone,
          email: company.contact?.email,
          contactType: 'sales',
          areaServed: company.areaServed,
          availableLanguage: company.availableLanguage
        },
        company.contact?.supportEmail ? {
          '@type': 'ContactPoint',
          email: company.contact.supportEmail,
          contactType: 'customer support',
          areaServed: company.areaServed,
          availableLanguage: company.availableLanguage
        } : null
      ].filter(Boolean),
      address: {
        '@type': 'PostalAddress',
        streetAddress: company.address?.street,
        addressLocality: company.address?.city,
        addressRegion: company.address?.region,
        postalCode: company.address?.postalCode,
        addressCountry: company.address?.country || company.address?.countryCode
      },
      foundingDate: company.foundingDate,
      numberOfEmployees: company.numberOfEmployees ? {
        '@type': 'QuantitativeValue',
        minValue: company.numberOfEmployees.min,
        maxValue: company.numberOfEmployees.max
      } : undefined,
      knowsAbout: company.knowsAbout,
      vatID: company.vatID,
      taxID: company.vatID,
      registrationNumber: company.registrationNumber,
      additionalType: 'https://schema.org/Corporation'
    }

    // Push company identity to site config stack
    siteConfig.push({
      identity
    })
  })
})
