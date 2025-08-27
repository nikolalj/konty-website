<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

const props = defineProps<Props>()

const { t, locale } = useI18n()
const config = useRuntimeConfig()

// Get currency code based on locale
function getCurrencyCode(): string {
  switch(locale.value) {
    case 'me': return 'EUR'
    case 'ba': return 'BAM'
    case 'us': return 'USD'
    default: return 'RSD'
  }
}

// Parse numeric price from translation string
function parsePrice(priceString: string): number {
  // Handle "Custom" or "Po dogovoru" cases
  if (!priceString || priceString.toLowerCase().includes('custom') || priceString.toLowerCase().includes('dogovor')) {
    return 0
  }
  
  // Extract numeric value from strings like "$59", "5.900 Din", "99€", "199 KM"
  const numericString = priceString.replace(/[^\d.,]/g, '')
  // Handle European number format (dots as thousands separator)
  const normalizedString = numericString.replace(/\./g, '').replace(',', '.')
  return parseFloat(normalizedString) || 0
}

// Map component product prop to translation key
function getProductKey(): string {
  if (props.product === 'kontyRetail') return 'retail'
  if (props.product === 'kontyHospitality') return 'hospitality'
  return 'hospitality' // default
}

const schema = computed(() => {
  const siteUrl = config.public.siteUrl || 'https://konty.com'
  const productKey = getProductKey()
  const currencyCode = getCurrencyCode()
  
  const productName = props.product === 'kontyRetail' 
    ? 'Konty Retail POS'
    : props.product === 'kontyHospitality'
    ? 'Konty Hospitality POS'
    : 'Konty POS'
    
  const productDescription = props.product === 'kontyRetail'
    ? t('seo.kontyRetail.description')
    : props.product === 'kontyHospitality'
    ? t('seo.kontyHospitality.description')
    : t('seo.products.description')

  // Build offers from translations
  const offers = []
  const tiers = ['start', 'standard', 'premium']
  
  for (const tier of tiers) {
    const priceString = t(`pricing.${productKey}.${tier}.price`) as string
    const price = parsePrice(priceString)
    
    // Skip if price is 0 (custom pricing)
    if (price === 0 && tier === 'premium') {
      continue
    }
    
    offers.push({
      "@type": "Offer",
      "name": t(`pricing.${productKey}.${tier}.title`),
      "description": t(`pricing.${productKey}.${tier}.description`),
      "price": price,
      "priceCurrency": currencyCode,
      "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/pricing`,
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": price,
        "priceCurrency": currencyCode,
        "billingDuration": "P1M",
        "billingIncrement": 1,
        "unitText": "MONTH"
      }
    })
  }

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": productName,
    "description": productDescription,
    "brand": {
      "@type": "Brand",
      "name": "Konty"
    },
    "category": "Point of Sale Software",
    "image": `${siteUrl}/images/konty-dashboard.png`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "327"
    },
    "offers": offers
  }
})

// Add schema to head
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(schema.value)
    }
  ]
})
</script>