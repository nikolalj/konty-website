/**
 * Server plugin to inject company data into site config at runtime
 * Reads company data from translation files and builds Organization schema
 */
import { DEFAULT_LOCALE } from '../../config/locale.config.mjs'
import type { ValidLocale } from '../../app/types/locale'

// Static imports for edge compatibility
import meData from '../../app/locales/me.json'
import rsData from '../../app/locales/rs.json'
import baData from '../../app/locales/ba.json'
import usData from '../../app/locales/us.json'

const localeData = {
  me: meData,
  rs: rsData,
  ba: baData,
  us: usData
}

interface CompanyData {
  tradeName: string
  vatID?: string
  foundingDate?: string
  founder?: string
  legalName?: string
  registrationNumber?: string
  geo?: {
    latitude: string
    longitude: string
  }
  paymentAccepted?: string
  businessHours?: {
    weekdays?: {
      opens: string
      closes: string
    }
  }
  address?: {
    street: string
    city: string
    region?: string
    postalCode: string
    country?: string
    countryCode?: string
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
    // Get the current locale from headers set by edge wrapper
    const currentLocaleHeader = event.node.req.headers['x-current-locale'] as string
    const locale = (currentLocaleHeader || DEFAULT_LOCALE.code) as ValidLocale

    // Load company data from static imports
    const translations = localeData[locale]
    if (!translations) {
      console.warn(`No translations found for locale ${locale}`)
      return
    }

    const company = translations.data?.company as CompanyData

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
      legalName: company.legalName || company.tradeName,
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
