/**
 * Locale-specific data for pricing, currency, and formatting
 */

interface LocalePricing {
  hospitality: {
    start: number
    standard: number
    premium: number
  }
  retail: {
    start: number
    standard: number
    premium: number
  }
}

interface LocaleInfo {
  currency: string
  currencySymbol: string
  pricing: LocalePricing
  dateFormat: string
  phoneFormat: string
}

const LOCALE_DATA: Record<string, LocaleInfo> = {
  me: {
    currency: 'EUR',
    currencySymbol: '€',
    pricing: {
      hospitality: { start: 25, standard: 30, premium: 50 },
      retail: { start: 12, standard: 15, premium: 20 }
    },
    dateFormat: 'DD.MM.YYYY',
    phoneFormat: '+382 XX XXX XXX'
  },
  rs: {
    currency: 'RSD',
    currencySymbol: 'Din',
    pricing: {
      hospitality: { start: 2900, standard: 3500, premium: 5800 },
      retail: { start: 1400, standard: 1750, premium: 2300 }
    },
    dateFormat: 'DD.MM.YYYY',
    phoneFormat: '+381 XX XXX XXXX'
  },
  ba: {
    currency: 'BAM',
    currencySymbol: 'KM',
    pricing: {
      hospitality: { start: 49, standard: 59, premium: 98 },
      retail: { start: 24, standard: 29, premium: 39 }
    },
    dateFormat: 'DD.MM.YYYY',
    phoneFormat: '+387 XX XXX XXX'
  },
  us: {
    currency: 'USD',
    currencySymbol: '$',
    pricing: {
      hospitality: { start: 29, standard: 35, premium: 59 },
      retail: { start: 15, standard: 19, premium: 25 }
    },
    dateFormat: 'MM/DD/YYYY',
    phoneFormat: '+1 (XXX) XXX-XXXX'
  }
}

export const useLocaleData = () => {
  const { locale } = useI18n()

  /**
   * Get locale-specific data
   */
  const localeData = computed(() => {
    return LOCALE_DATA[locale.value] || LOCALE_DATA.me
  })

  /**
   * Format price with locale currency
   */
  const formatPrice = (amount: number, showSymbol = true): string => {
    const data = localeData.value
    if (!data) return `${amount}`

    if (locale.value === 'us') {
      return showSymbol ? `${data.currencySymbol}${amount}` : `${amount}`
    } else if (locale.value === 'rs') {
      return showSymbol ? `${amount.toLocaleString('sr-RS')} ${data.currencySymbol}` : `${amount.toLocaleString('sr-RS')}`
    } else if (locale.value === 'ba') {
      return showSymbol ? `${amount} ${data.currencySymbol}` : `${amount}`
    } else {
      return showSymbol ? `${amount} ${data.currencySymbol}` : `${amount}`
    }
  }

  /**
   * Get pricing for a specific product and plan
   */
  const getPricing = (product: 'hospitality' | 'retail', plan: 'start' | 'standard' | 'premium'): number => {
    const data = localeData.value
    if (!data) return 0
    return data.pricing[product][plan]
  }

  /**
   * Format phone number according to locale
   */
  const formatPhone = (phone: string): string => {
    // This is a placeholder - implement actual formatting logic
    return phone
  }

  /**
   * Format date according to locale
   */
  const formatDate = (date: Date): string => {
    const data = localeData.value
    if (!data) return date.toLocaleDateString()
    
    const format = data.dateFormat
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()

    if (format === 'MM/DD/YYYY') {
      return `${month}/${day}/${year}`
    } else {
      return `${day}.${month}.${year}`
    }
  }

  return {
    localeData,
    formatPrice,
    getPricing,
    formatPhone,
    formatDate,
  }
}
