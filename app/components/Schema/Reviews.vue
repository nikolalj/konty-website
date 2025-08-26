<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface Review {
  author: string
  business?: string
  rating: number
  date: string
  text: string
}

interface Props {
  product?: 'kontyRetail' | 'kontyHospitality'
}

const props = defineProps<Props>()

const { t } = useI18n()
const config = useRuntimeConfig()

// Sample reviews - in production, these would come from a database
const reviews = computed<Review[]>(() => {
  // Base reviews that apply to all products
  const baseReviews: Review[] = [
    {
      author: "Marko Petrović",
      business: "Restoran Zlatno Zvono",
      rating: 5,
      date: "2024-11-15",
      text: t('reviews.review1')
    },
    {
      author: "Ana Jovanović",
      business: "Boutique Bella",
      rating: 5,
      date: "2024-10-28",
      text: t('reviews.review2')
    },
    {
      author: "Stefan Nikolić",
      business: "Caffe Bar Central",
      rating: 4,
      date: "2024-10-10",
      text: t('reviews.review3')
    }
  ]
  
  // Add product-specific reviews
  if (props.product === 'kontyRetail') {
    return [
      ...baseReviews,
      {
        author: "Milica Stojanović",
        business: "Market Express",
        rating: 5,
        date: "2024-09-22",
        text: t('reviews.retail.review1')
      },
      {
        author: "Nikola Đorđević",
        business: "Tech Shop Pro",
        rating: 5,
        date: "2024-09-05",
        text: t('reviews.retail.review2')
      }
    ]
  } else if (props.product === 'kontyHospitality') {
    return [
      ...baseReviews,
      {
        author: "Jelena Pavlović",
        business: "Hotel Panorama",
        rating: 5,
        date: "2024-09-18",
        text: t('reviews.hospitality.review1')
      },
      {
        author: "Dragan Milić",
        business: "Pizza Maestro",
        rating: 5,
        date: "2024-08-30",
        text: t('reviews.hospitality.review2')
      }
    ]
  }
  
  return baseReviews
})

const schema = computed(() => {
  const siteUrl = config.public.siteUrl || 'https://konty.com'
  
  const productName = props.product === 'kontyRetail' 
    ? 'Konty Retail POS'
    : props.product === 'kontyHospitality'
    ? 'Konty Hospitality POS'
    : 'Konty POS'

  return reviews.value.map(review => ({
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "SoftwareApplication",
      "name": productName
    },
    "author": {
      "@type": "Person",
      "name": review.author,
      ...(review.business && {
        "worksFor": {
          "@type": "Organization",
          "name": review.business
        }
      })
    },
    "datePublished": review.date,
    "reviewBody": review.text,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": 5,
      "worstRating": 1
    }
  }))
})

// Add multiple review schemas to head
useHead({
  script: schema.value.map(s => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(s)
  }))
})
</script>