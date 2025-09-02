/**
 * Base Site Configuration
 * Core metadata and SEO settings that apply globally
 */

export interface BaseSiteConfig {
  // Core Identity
  name: string
  tagline: string
  description: string
  
  // URLs
  url: string
  domain: string
  
  // SEO
  indexable: boolean
  trailingSlash: boolean
  
  // Business Identity
  company: {
    legalName: string
    foundingYear: number
    type: 'Organization' | 'Corporation' | 'LocalBusiness'
    industry: string
    logo: string
    darkLogo?: string
  }
  
  // Social Profiles
  social: {
    facebook?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    youtube?: string
  }
  
  // Contact (will be overridden per locale)
  contact: {
    email: string
    phone?: string
    support?: string
    sales?: string
  }
}

/**
 * Default base configuration
 * These values are overridden by environment and locale-specific configs
 */
export const baseConfig: BaseSiteConfig = {
  // Core Identity
  name: 'Konty',
  tagline: 'Count on us',
  description: 'Next-generation Point of Sale solution for retail and hospitality. Simplify operations, grow your business.',
  
  // URLs - will be overridden by environment
  url: process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com',
  domain: 'konty.com',
  
  // SEO Settings
  indexable: true, // Will be overridden for staging
  trailingSlash: false,
  
  // Business Identity
  company: {
    legalName: 'Konty d.o.o.',
    foundingYear: 1998, // 26+ years of experience
    type: 'Organization',
    industry: 'Software Development',
    logo: '/images/logo.svg',
    darkLogo: '/images/logo-dark.svg'
  },
  
  // Social Profiles
  social: {
    facebook: 'https://www.facebook.com/konty/',
    linkedin: 'https://www.linkedin.com/company/konty/',
    // Add others as needed
  },
  
  // Default Contact
  contact: {
    email: 'info@konty.com',
    support: 'support@konty.com',
    sales: 'sales@konty.com'
  }
}

/**
 * Environment-specific overrides
 */
export function getEnvironmentConfig(): Partial<BaseSiteConfig> {
  const isProduction = process.env.APP_ENV === 'production'
  const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || 'https://konty.com'
  
  return {
    url: siteUrl,
    indexable: isProduction && siteUrl.includes('konty.com'),
    // Add staging-specific overrides
    ...((!isProduction) && {
      name: 'Konty (Staging)',
      tagline: 'Test Environment'
    })
  }
}