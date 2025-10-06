<template>
  <SharedSection
    :variant="props.variant"
    :heading-level="props.headingLevel"
    :title="t('pages.home.testimonials.title')"
    :description="t('pages.home.testimonials.description')"
  >
    <UIAppear direction="up">
      <div class="text-center mb-16">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
          {{ faqData.title }}
        </h2>
        <p class="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {{ faqData.subtitle }}
        </p>
      </div>

      <div class="max-w-4xl mx-auto space-y-4">
        <div
          v-for="(item, index) in faqItems"
          :key="index"
          class="group rounded-xl bg-white dark:bg-gray-900 ring-1 ring-gray-200 dark:ring-gray-800 hover:ring-primary-300 dark:hover:ring-primary-700 transition-all duration-200 overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between p-6 text-left transition-all duration-200"
            :class="openItems.includes(index) ? 'bg-primary-50/50 dark:bg-primary-950/30' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'"
            @click="toggleItem(index)"
          >
            <div class="flex items-start gap-4 flex-1">
              <div class="flex-shrink-0 mt-1">
                <div class="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center transition-all duration-200" :class="openItems.includes(index) ? 'bg-primary-200 dark:bg-primary-800/50' : ''">
                  <UIcon
                    name="i-lucide-help-circle"
                    class="w-5 h-5 text-primary-600 dark:text-primary-400"
                  />
                </div>
              </div>
              <span class="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors pr-8">
                {{ item.label }}
              </span>
            </div>
            <UIcon
              name="i-lucide-chevron-down"
              class="w-6 h-6 text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all duration-300 flex-shrink-0"
              :class="openItems.includes(index) ? 'rotate-180' : ''"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-[1000px] opacity-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="max-h-[1000px] opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="openItems.includes(index)" class="overflow-hidden">
              <div class="px-6 pb-6 pt-2">
                <div class="pl-14">
                  <div class="text-base sm:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                    {{ item.content }}
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType, SectionHeadingLevel } from '~/types/components'

const { t } = useI18n()

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
  headingLevel: {
    type: String as PropType<SectionHeadingLevel>,
    default: 'h2'
  }
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
