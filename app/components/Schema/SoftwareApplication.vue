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

const schema = computed(() => {
  const siteUrl = config.public.siteUrl || 'https://konty.com'

  // Base schema for both products
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Konty POS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Windows, macOS, Android, iOS",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": getCurrentCurrency(),
      "description": t('pricing.freeTrial')
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "327",
      "bestRating": "5",
      "worstRating": "1"
    },
    "author": {
      "@type": "Organization",
      "name": "Konty",
      "url": siteUrl
    },
    "datePublished": "2020-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "screenshot": `${siteUrl}/images/konty-dashboard.png`,
    "featureList": [
      t('schema.features.cloudBased'),
      t('schema.features.inventory'),
      t('schema.features.analytics'),
      t('schema.features.multiLocation'),
      t('schema.features.offlineMode'),
      t('schema.features.fiscalization')
    ],
    "softwareRequirements": t('schema.requirements.minimal'),
    "permissions": "camera, storage, internet",
    "availableOnDevice": "Desktop, Mobile, Tablet"
  }

  // Specific schemas for retail and hospitality
  if (props.product === 'kontyRetail') {
    return {
      ...baseSchema,
      "@id": `${siteUrl}/#konty-retail`,
      "name": "Konty Retail POS",
      "description": t('seo.kontyRetail.description'),
      "url": `${siteUrl}/konty-retail`,
      "applicationSubCategory": "RetailPOS",
      "featureList": [
        ...baseSchema.featureList,
        t('schema.features.retail.barcode'),
        t('schema.features.retail.loyaltyProgram'),
        t('schema.features.retail.suppliers')
      ]
    }
  } else if (props.product === 'kontyHospitality') {
    return {
      ...baseSchema,
      "@id": `${siteUrl}/#konty-hospitality`,
      "name": "Konty Hospitality POS",
      "description": t('seo.kontyHospitality.description'),
      "url": `${siteUrl}/konty-hospitality`,
      "applicationSubCategory": "RestaurantPOS",
      "featureList": [
        ...baseSchema.featureList,
        t('schema.features.hospitality.tableManagement'),
        t('schema.features.hospitality.kitchenDisplay'),
        t('schema.features.hospitality.modifiers'),
        t('schema.features.hospitality.splitBills')
      ]
    }
  }

  // Both variants (for homepage/general pages)
  return {
    ...baseSchema,
    "@id": `${siteUrl}/#konty-pos`,
    "description": t('seo.home.description'),
    "url": siteUrl,
    "applicationSubCategory": "PointOfSale"
  }
})

function getCurrentCurrency() {
  switch(locale.value) {
    case 'me': return 'EUR'
    case 'ba': return 'BAM'
    case 'us': return 'USD'
    default: return 'RSD'
  }
}

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
