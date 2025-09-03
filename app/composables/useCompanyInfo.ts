/**
 * Composable for dynamic company information based on locale
 * Updates site config at runtime for proper SEO per locale
 */

import { getCompanyInfo } from '../../config/company.config'

export const useCompanyInfo = () => {
  const { locale } = useI18n()
  const config = useRuntimeConfig()

  // Get company info for current locale
  const company = computed(() => getCompanyInfo(locale.value))

  // Update site config dynamically based on locale
  // This ensures Schema.org uses correct legal entity per market
  const updateCompanySchema = () => {
    const currentCompany = company.value

    updateSiteConfig({
      // Update identity for current locale's legal entity
      identity: {
        type: 'Organization',
        name: currentCompany.legalName,
        legalName: currentCompany.legalName,
        logo: '/images/branding/logo-light.svg',
        url: config.public.siteUrl || 'https://konty.com',

        // Social profiles
        sameAs: Object.values(currentCompany.social || {}).filter(Boolean),

        // Contact for this locale
        contactPoint: {
          '@type': 'ContactPoint',
          telephone: currentCompany.contact.phone,
          email: currentCompany.contact.email,
          contactType: 'sales',
          availableLanguage: currentCompany.availableLanguage,
          areaServed: currentCompany.areaServed
        },

        // Physical address for this entity
        address: {
          '@type': 'PostalAddress',
          streetAddress: currentCompany.address.street,
          addressLocality: currentCompany.address.city,
          addressRegion: currentCompany.address.region,
          postalCode: currentCompany.address.postalCode,
          addressCountry: currentCompany.address.countryCode
        },

        // Company details
        foundingDate: currentCompany.foundingDate,
        vatID: currentCompany.vatID,

        // Trust signals
        numberOfEmployees: currentCompany.numberOfEmployees ? {
          '@type': 'QuantitativeValue',
          minValue: currentCompany.numberOfEmployees.min,
          maxValue: currentCompany.numberOfEmployees.max
        } : undefined,

        // Expertise
        knowsAbout: currentCompany.knowsAbout
      }
    })
  }

  // Update on locale change
  watch(locale, () => {
    updateCompanySchema()
  }, { immediate: true })

  return {
    company,
    updateCompanySchema
  }
}
