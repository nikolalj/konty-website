export interface CompanyEntity {
  legalName: string
  tradeName: string
  vatID?: string
  registrationNumber?: string
  address: {
    street: string
    city: string
    region?: string
    postalCode: string
    country: string
    countryCode: string
  }
  contact: {
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
  foundingDate?: string
  numberOfEmployees?: {
    min: number
    max: number
  },
  knowsAbout: string[],
  availableLanguage: string[],
  areaServed: string[]
}

export interface CompanyConfig {
  [locale: string]: CompanyEntity
}

// Default company info (fallback for undefined locales)
const defaultEntity: CompanyEntity = {
  legalName: 'Codeux d.o.o. Beograd',
  tradeName: 'Codeux',
  vatID: '112821082',
  registrationNumber: '21746282',
  address: {
    street: 'Trnska 7',
    city: 'Belgrade',
    region: 'Belgrade',
    postalCode: '11000',
    country: 'Serbia',
    countryCode: 'RS'
  },
  contact: {
    phone: '+38267607670',
    email: 'contact@konty.com',
    supportEmail: 'support@konty.com',
    salesEmail: 'sales@konty.com'
  },
  social: {
    facebook: 'https://www.facebook.com/kontypos',
    linkedin: 'https://www.linkedin.com/company/kontypos',
    instagram: 'https://www.instagram.com/kontypos'
  },
  foundingDate: '2021-12-22',
  availableLanguage: ['Serbian', 'Bosnian', 'Croatian', 'English'],
  areaServed: ['US', 'RS', 'ME', 'BA', 'HR'],
  numberOfEmployees: {
    min: 1,
    max: 20
  },
  knowsAbout: [
    'POS sistemi',
    'Softver za upravljanje restoranima',
    'Softver za upravljanje maloprodajom',
    'Upravljanje zalihama',
    'Fiskalna usklađenost',
    'POS rešenja u oblaku',
  ]
}

// Company entities per locale
export const COMPANY_CONFIG: CompanyConfig = {
  rs: defaultEntity,
  ba: defaultEntity,
  us: {
    ...defaultEntity,
    knowsAbout: [
      'Point of Sale Systems',
      'Restaurant Management Software',
      'Retail Management Software',
      'Inventory Management',
      'Fiscal Compliance',
      'Cloud-based POS Solutions',
    ]
  },
  me: {
    ...defaultEntity,
    legalName: 'OllieTech d.o.o. Podgorica',
    tradeName: 'OllieTech',
    vatID: '03554759',
    registrationNumber: '03554759',
    address: {
      street: 'Baku 3',
      city: 'Podgorica',
      region: 'Podgorica',
      postalCode: '81000',
      country: 'Montenegro',
      countryCode: 'ME'
    },
    contact: {
      phone: '+38267607670',
      email: 'contact@konty.com',
      supportEmail: 'support@konty.com',
      salesEmail: 'sales@konty.com'
    },
  }
}

// Helper to get company info for a locale with fallback
export const getCompanyInfo = (locale: string): CompanyEntity => {
  return COMPANY_CONFIG[locale] || defaultEntity
}

// Business metrics (update periodically)
export const BUSINESS_METRICS = {
  totalCustomers: 9000,
  yearsInBusiness: 26
}
