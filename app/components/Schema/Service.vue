<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  serviceType?: 'pos-system' | 'implementation' | 'support' | 'training'
}

const props = withDefaults(defineProps<Props>(), {
  serviceType: 'pos-system'
})

const serviceSchemas = {
  'pos-system': {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://konty.com/#pos-service",
    "name": "POS Sistem Rešenja",
    "description": "Kompletna POS sistema rešenja za restorane, kafice i maloprodajne objekte. Uključuje software, implementaciju, obuku i podršku.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Konty",
      "url": "https://konty.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Moskovska 153",
        "addressLocality": "Podgorica",
        "addressRegion": "Podgorica",
        "postalCode": "81000",
        "addressCountry": "ME"
      },
      "telephone": "+38267607670",
      "email": "support@konty.com"
    },
    "serviceType": "Point of Sale System",
    "category": "Business Software Solutions",
    "areaServed": {
      "@type": "Country",
      "name": "Montenegro"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "POS Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Konty Retail POS",
            "description": "POS sistem za maloprodaju"
          },
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "Konty Hospitality POS",
            "description": "POS sistem za ugostiteljstvo"
          },
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "url": "https://konty.com/pricing",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "validFrom": "2024-01-01"
    }
  },
  'implementation': {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "POS Sistema Implementacija",
    "description": "Profesionalna instalacija i konfiguracija POS sistema prilagođena potrebama vašeg poslovanja.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Konty"
    },
    "serviceType": "Software Implementation",
    "category": "IT Services"
  },
  'support': {
    "@context": "https://schema.org",
    "@type": "Service", 
    "name": "Tehnička Podrška",
    "description": "24/7 tehnička podrška za sve Konty POS korisnike. Brzo rešavanje problema i ažuriranja sistema.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Konty"
    },
    "serviceType": "Technical Support",
    "category": "Customer Support"
  },
  'training': {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Obuka Osoblja",
    "description": "Kompletna obuka vašeg osoblja za rad sa Konty POS sistemom. Uključuje praktičnu obuku i dokumentaciju.",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Konty"
    },
    "serviceType": "Staff Training",
    "category": "Educational Services"
  }
}

const selectedSchema = computed(() => serviceSchemas[props.serviceType])

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(selectedSchema.value)
    }
  ]
})
</script>