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

// Use testimonials from translations
const reviews = computed<Review[]>(() => {
  // Get testimonials from translations - use first 3 for general, t2 and t5 for retail, t1 and t3 for hospitality
  const t1 = {
    name: t('testimonials.t1.name'),
    role: t('testimonials.t1.role'),
    quote: t('testimonials.t1.quote')
  }
  const t2 = {
    name: t('testimonials.t2.name'),
    role: t('testimonials.t2.role'),
    quote: t('testimonials.t2.quote')
  }
  const t3 = {
    name: t('testimonials.t3.name'),
    role: t('testimonials.t3.role'),
    quote: t('testimonials.t3.quote')
  }
  const t4 = {
    name: t('testimonials.t4.name'),
    role: t('testimonials.t4.role'),
    quote: t('testimonials.t4.quote')
  }
  const t5 = {
    name: t('testimonials.t5.name'),
    role: t('testimonials.t5.role'),
    quote: t('testimonials.t5.quote')
  }
  
  // Base reviews that apply to all products (using testimonials 1, 3, 4)
  const baseReviews: Review[] = [
    {
      author: t1.name,
      business: t1.role.replace(/^.*"(.+)".*$/, '$1'), // Extract business name from role
      rating: 5,
      date: "2024-11-15",
      text: t1.quote
    },
    {
      author: t3.name,
      business: t3.role.replace(/^.*"(.+)".*$/, '$1'),
      rating: 5,
      date: "2024-10-28",
      text: t3.quote
    },
    {
      author: t4.name,
      business: t4.role.replace(/^.*"(.+)".*$/, '$1'),
      rating: 5,
      date: "2024-10-10",
      text: t4.quote
    }
  ]
  
  // Add product-specific reviews
  if (props.product === 'kontyRetail') {
    // Use testimonials 2 and 5 for retail
    return [
      ...baseReviews,
      {
        author: t2.name,
        business: t2.role.replace(/^.*"(.+)".*$/, '$1'),
        rating: 5,
        date: "2024-09-22",
        text: t2.quote
      },
      {
        author: t5.name,
        business: t5.role.replace(/^.*"(.+)".*$/, '$1'),
        rating: 5,
        date: "2024-09-05",
        text: t5.quote
      }
    ]
  } else if (props.product === 'kontyHospitality') {
    // Add more restaurant/hospitality focused testimonials
    const t6 = {
      name: t('testimonials.t6.name'),
      role: t('testimonials.t6.role'),
      quote: t('testimonials.t6.quote')
    }
    const t7 = {
      name: t('testimonials.t7.name'),
      role: t('testimonials.t7.role'),
      quote: t('testimonials.t7.quote')
    }
    return [
      ...baseReviews,
      {
        author: t6.name,
        business: t6.role.replace(/^.*"(.+)".*$/, '$1'),
        rating: 5,
        date: "2024-09-18",
        text: t6.quote
      },
      {
        author: t7.name,
        business: t7.role.replace(/^.*"(.+)".*$/, '$1'),
        rating: 5,
        date: "2024-08-30",
        text: t7.quote
      }
    ]
  }
  
  return baseReviews
})

const schema = computed(() => {
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