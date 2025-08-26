<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface FAQItem {
  question: string
  answer: string
}

interface Props {
  category?: 'general' | 'pricing' | 'features' | 'support'
  customFaqs?: FAQItem[]
}

const props = defineProps<Props>()

const { t } = useI18n()
const config = useRuntimeConfig()

// Define FAQs based on category
const faqs = computed<FAQItem[]>(() => {
  // If custom FAQs provided, use those
  if (props.customFaqs) {
    return props.customFaqs
  }
  
  // Otherwise use predefined FAQs based on category
  switch(props.category) {
    case 'pricing':
      return [
        {
          question: t('faq.pricing.q1'),
          answer: t('faq.pricing.a1')
        },
        {
          question: t('faq.pricing.q2'),
          answer: t('faq.pricing.a2')
        },
        {
          question: t('faq.pricing.q3'),
          answer: t('faq.pricing.a3')
        },
        {
          question: t('faq.pricing.q4'),
          answer: t('faq.pricing.a4')
        }
      ]
    case 'features':
      return [
        {
          question: t('faq.features.q1'),
          answer: t('faq.features.a1')
        },
        {
          question: t('faq.features.q2'),
          answer: t('faq.features.a2')
        },
        {
          question: t('faq.features.q3'),
          answer: t('faq.features.a3')
        }
      ]
    case 'support':
      return [
        {
          question: t('faq.support.q1'),
          answer: t('faq.support.a1')
        },
        {
          question: t('faq.support.q2'),
          answer: t('faq.support.a2')
        },
        {
          question: t('faq.support.q3'),
          answer: t('faq.support.a3')
        }
      ]
    default: // general
      return [
        {
          question: t('faq.general.q1'),
          answer: t('faq.general.a1')
        },
        {
          question: t('faq.general.q2'),
          answer: t('faq.general.a2')
        },
        {
          question: t('faq.general.q3'),
          answer: t('faq.general.a3')
        },
        {
          question: t('faq.general.q4'),
          answer: t('faq.general.a4')
        },
        {
          question: t('faq.general.q5'),
          answer: t('faq.general.a5')
        }
      ]
  }
})

const schema = computed(() => {
  const siteUrl = config.public.siteUrl || 'https://konty.com'
  
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.value.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
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