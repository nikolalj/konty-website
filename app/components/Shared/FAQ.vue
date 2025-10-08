<template>
  <SharedSection
    :variant="props.variant"
    :heading-level="props.headingLevel"
    :title="faqData.title"
    :description="faqData.subtitle"
  >
    <UIAppear direction="up">
      <div class="max-w-4xl mx-auto space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="group rounded-xl border border-primary/10 hover:border-primary/40  transition-all duration-200 overflow-hidden"
          :class="openItems.includes(index) ? 'bg-primary/8' : 'bg-primary/3 hover:bg-primary/8'"
        >
          <button
            class="w-full flex items-center justify-between gap-4 p-4 text-left transition-all duration-200"
            @click="toggleItem(index)"
          >
            <div class="flex items-center gap-4 flex-1 min-w-0">
              <div class="flex-shrink-0">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200"
                  :class="openItems.includes(index) ? 'bg-primary/20' : 'bg-primary/10'"
                >
                  <UIcon
                    name="i-lucide-help-circle"
                    class="w-5 h-5 text-primary-600 dark:text-primary-400"
                  />
                </div>
              </div>
              <span class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ item.label }}
              </span>
            </div>
            <UIcon
              name="i-lucide-chevron-down"
              class="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 flex-shrink-0"
              :class="openItems.includes(index) ? 'rotate-180' : ''"
            />
          </button>

          <div
            class="grid transition-all duration-300 ease-in-out"
            :style="{
              gridTemplateRows: openItems.includes(index) ? '1fr' : '0fr'
            }"
          >
            <div class="overflow-hidden">
              <div class="px-4 pb-4">
                <div class="pl-14">
                  <div class="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType, SectionHeadingLevel } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  category: {
    type: String as PropType<'retail' | 'hospitality' | 'partners' | undefined>,
    default: undefined
  },
  headingLevel: {
    type: String as PropType<SectionHeadingLevel>,
    default: 'h2'
  }
})

const { tObject } = useUtils()

const faqData = computed(() => {
  if (props.category === 'partners') return tObject('pages.partners.faq')
  if (props.category) return tObject(`pages.products.${props.category}.faq`)
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

// State for tracking open items
const openItems = ref<number[]>([])

// Toggle accordion item
const toggleItem = (index: number) => {
  const itemIndex = openItems.value.indexOf(index)
  if (itemIndex > -1) {
    openItems.value.splice(itemIndex, 1)
  } else {
    openItems.value.push(index)
  }
}
</script>
