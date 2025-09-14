<template>
  <section class="py-16 sm:py-20">
    <UContainer>
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
    </UContainer>
  </section>
</template>

<script setup lang="ts">
interface Props {
  product: 'kontyHospitality' | 'kontyRetail'
}

const props = defineProps<Props>()
const { tObject } = useUtils()

const faqData = computed(() => tObject(`pages.${props.product}.faq`))

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