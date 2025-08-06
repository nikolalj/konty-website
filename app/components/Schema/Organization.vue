<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
// Organization schema markup component
// Include this on homepage, about, and contact pages

const organizationSchema = {
  "@context": "http://schema.org",
  "@type": "Organization",
  "name": "Konty",
  "url": "https://konty.com",
  "logo": "https://konty.com/images/logo.svg",
  "description": "Kompletno rešenje je napravljeno specijalno za maloprodaju i uslužne delatnosti. Pokriva Vaše poslovne procese na efikasan način.",
  "sameAs": [
    "https://www.facebook.com/konty/",
    "https://www.linkedin.com/company/konty/"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+38267607670",
    "email": "support@konty.com",
    "contactType": "customer service"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Moskovska 153",
    "addressLocality": "Podgorica",
    "addressRegion": "Podgorica", 
    "postalCode": "81000",
    "addressCountry": "ME"
  }
}

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(organizationSchema)
    }
  ]
})
</script>