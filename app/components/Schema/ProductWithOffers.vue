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

// Get pricing based on locale
function getPricing() {
  const currency = getCurrentCurrency()
  const currencySymbol = getCurrencySymbol()
  
  // Simplified pricing structure - you should update with actual prices
  switch(locale.value) {
    case 'me':
      return {
        start: { price: 29, currency: 'EUR', symbol: '€' },
        standard: { price: 49, currency: 'EUR', symbol: '€' },
        premium: { price: 99, currency: 'EUR', symbol: '€' }
      }
    case 'ba':
      return {
        start: { price: 59, currency: 'BAM', symbol: 'KM' },
        standard: { price: 99, currency: 'BAM', symbol: 'KM' },
        premium: { price: 199, currency: 'BAM', symbol: 'KM' }
      }
    case 'us':
      return {
        start: { price: 39, currency: 'USD', symbol: '$' },
        standard: { price: 69, currency: 'USD', symbol: '$' },
        premium: { price: 129, currency: 'USD', symbol: '$' }
      }
    default: // rs
      return {
        start: { price: 2990, currency: 'RSD', symbol: 'RSD' },
        standard: { price: 4990, currency: 'RSD', symbol: 'RSD' },
        premium: { price: 9990, currency: 'RSD', symbol: 'RSD' }
      }
  }
}

function getCurrentCurrency() {
  switch(locale.value) {
    case 'me': return 'EUR'
    case 'ba': return 'BAM'
    case 'us': return 'USD'
    default: return 'RSD'
  }
}

function getCurrencySymbol() {
  switch(locale.value) {
    case 'me': return '€'
    case 'ba': return 'KM'
    case 'us': return '$'
    default: return 'RSD'
  }
}

const schema = computed(() => {
  const siteUrl = config.public.siteUrl || 'https://konty.com'
  const pricing = getPricing()
  
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
    "offers": [
      {
        "@type": "Offer",
        "name": t('pricing.tiers.start.title'),
        "description": t('pricing.tiers.start.description'),
        "price": pricing.start.price,
        "priceCurrency": pricing.start.currency,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": `${siteUrl}/pricing`,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": pricing.start.price,
          "priceCurrency": pricing.start.currency,
          "billingDuration": "P1M",
          "billingIncrement": 1,
          "unitText": "MONTH"
        }
      },
      {
        "@type": "Offer",
        "name": t('pricing.tiers.standard.title'),
        "description": t('pricing.tiers.standard.description'),
        "price": pricing.standard.price,
        "priceCurrency": pricing.standard.currency,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": `${siteUrl}/pricing`,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": pricing.standard.price,
          "priceCurrency": pricing.standard.currency,
          "billingDuration": "P1M",
          "billingIncrement": 1,
          "unitText": "MONTH"
        }
      },
      {
        "@type": "Offer",
        "name": t('pricing.tiers.premium.title'),
        "description": t('pricing.tiers.premium.description'),
        "price": pricing.premium.price,
        "priceCurrency": pricing.premium.currency,
        "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "url": `${siteUrl}/pricing`,
        "priceSpecification": {
          "@type": "UnitPriceSpecification",
          "price": pricing.premium.price,
          "priceCurrency": pricing.premium.currency,
          "billingDuration": "P1M",
          "billingIncrement": 1,
          "unitText": "MONTH"
        }
      }
    ]
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