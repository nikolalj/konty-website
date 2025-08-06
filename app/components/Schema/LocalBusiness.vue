<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
// Local Business schema markup component
// Use this on location-specific pages or contact pages

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://konty.com/#localbusiness",
  "name": "Konty",
  "url": "https://konty.com",
  "logo": "https://konty.com/images/logo.svg",
  "description": "Profesionalni POS sistem za restorane i maloprodajne objekte. Povećajte efikasnost poslovanja sa Konty rešenjem.",
  "telephone": "+38267607670",
  "email": "support@konty.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Moskovska 153",
    "addressLocality": "Podgorica",
    "addressRegion": "Podgorica",
    "postalCode": "81000",
    "addressCountry": "ME"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "42.4304",
    "longitude": "19.2594"
  },
  "openingHours": [
    "Mo-Fr 09:00-17:00"
  ],
  "sameAs": [
    "https://www.facebook.com/konty/",
    "https://www.linkedin.com/company/konty/"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "POS Systems",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Konty Retail POS",
          "description": "POS sistem specijalizovan za maloprodajne objekte"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Product",
          "name": "Konty Hospitality POS",
          "description": "POS sistem specijalizovan za restorane i kafice"
        }
      }
    ]
  },
  "areaServed": {
    "@type": "Country",
    "name": "Montenegro"
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(localBusinessSchema)
    }
  ]
})
</script>