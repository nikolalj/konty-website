<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  productType: 'retail' | 'hospitality'
}

const props = defineProps<Props>()

const productSchemas = {
  retail: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://konty.com/konty-retail#product",
    "name": "Konty Retail POS",
    "description": "Profesionalni POS sistem dizajniran specijalno za maloprodajne objekte, trgovine i butike. Upravljanje zalihama, prodaja, izveštaji u realnom vremenu.",
    "url": "https://konty.com/konty-retail",
    "image": "https://konty.com/images/konty-retail-screenshot.webp",
    "screenshot": "https://konty.com/images/konty-retail-interface.webp",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Point of Sale Software",
    "operatingSystem": ["Windows", "iOS", "Android", "Web Browser"],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://konty.com/pricing",
      "seller": {
        "@type": "Organization",
        "name": "Konty"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Konty",
      "url": "https://konty.com"
    },
    "featureList": [
      "Upravljanje zalihama u realnom vremenu",
      "Brzo skeniranje barkodova",
      "Detaljni izveštaji o prodaji",
      "Upravljanje kupcima",
      "Integracija sa e-fiskalizacijom",
      "Rad sa više kasa",
      "Popusti i promocije",
      "Analitika prodaje"
    ],
    "requirements": "Internet konekcija, Windows 10+ ili mobilni uređaj",
    "softwareVersion": "2024.1",
    "datePublished": "2020-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  },
  hospitality: {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": "https://konty.com/konty-hospitality#product",
    "name": "Konty Hospitality POS",
    "description": "Specijalizovani POS sistem za restorane, kafice i ugostiteljske objekte. Upravljanje menijima, stolovima, narudžbama i integracijom sa kuhinjom.",
    "url": "https://konty.com/konty-hospitality",
    "image": "https://konty.com/images/konty-hospitality-screenshot.webp",
    "screenshot": "https://konty.com/images/konty-hospitality-interface.webp",
    "applicationCategory": "BusinessApplication",
    "applicationSubCategory": "Restaurant Management Software",
    "operatingSystem": ["Windows", "iOS", "Android", "Web Browser"],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "url": "https://konty.com/pricing",
      "seller": {
        "@type": "Organization",
        "name": "Konty"
      }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Konty",
      "url": "https://konty.com"
    },
    "featureList": [
      "Upravljanje menijima i cenama",
      "Rezervacija i upravljanje stolovima",
      "Narudžbe i komunikacija sa kuhinjom",
      "Upravljanje osobljem i smenama",
      "Izveštaji o prodaji po kategorijama",
      "Integracija sa dostavnim platformama",
      "Upravljanje zalihama namirnica",
      "Split računi i grupne narudžbe"
    ],
    "requirements": "Internet konekcija, Windows 10+ ili tablet uređaj",
    "softwareVersion": "2024.1",
    "datePublished": "2020-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  }
}

const selectedSchema = computed(() => productSchemas[props.productType])

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(selectedSchema.value)
    }
  ]
})
</script>