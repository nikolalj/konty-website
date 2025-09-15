<template>
  <SharedSection
    :title="t('pages.home.testimonials.title')"
    :description="t('pages.home.testimonials.description')"
  >
    <UIAppear direction="up">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4">{{ faqData.title }}</h2>
        <p class="text-lg text-muted">{{ faqData.subtitle }}</p>
      </div>

      <div class="max-w-3xl mx-auto space-y-3">
        <UAccordion
          :items="faqItems"
          multiple
        />
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps({
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})

const { tObject } = useUtils()

const faqData = computed(() => {
  if (props.product) return tObject(`pages.products.${props.product}.faq`)
  return tObject('pages.products.faq')
})

const faqItems = computed(() => {
  const items = []
  const faq = faqData.value

  // Extract Q&A pairs from the FAQ object
  let i = 1
  while (faq[`q${i}`] && faq[`a${i}`]) {
    items.push({
      label: faq[`q${i}`],
      content: faq[`a${i}`]
    })
    i++
  }

  return items
})
</script>
