<template>
  <section class="py-12 sm:py-16" :class="bgClasses">
    <UContainer>
      <div
        v-if="props.title || props.description || props.productSwitch"
        class="flex flex-col items-center mb-16"
      >
        <UIAppear :animate-on="props.title">
          <component
            :is="props.headingLevel || 'h2'"
            v-if="props.title"
            class="mt-4 mb-4 text-center text-pretty tracking-tight font-bold text-highlighted"
            :class="(props.headingLevel || 'h2') === 'h1' ? 'text-4xl sm:text-5xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-5xl'"
          >
            {{ props.title }}
          </component>
        </UIAppear>

        <UIAppear :animate-on="props.description">
          <p
            v-if="props.description"
            class="text-lg leading-8 text-muted max-w-5xl text-center"
          >
            {{ props.description }}
          </p>
        </UIAppear>

        <UIAppear>
          <UTabs
            v-if="props.productSwitch"
            v-model="productInternal"
            :items="items"
            class="mt-8 w-full sm:w-lg"
          />
        </UIAppear>
      </div>

      <slot />

    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'
import type { SectionVariantType, SectionHeadingLevel } from '~/types/components'

const { t } = useI18n()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  modelValue: {
    type: String,
    default: 'hospitality'
  },
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  productSwitch: {
    type: Boolean,
    default: false
  },
  headingLevel: {
    type: String as PropType<SectionHeadingLevel>,
    default: 'h2'
  },
})

const getBgClass = (variant: SectionVariantType) => {
  if (variant === '1') return 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]'
  if (variant === '2') return 'bg-[var(--bg-200)] dark:bg-[var(--bg-300)]'
  if (variant === '3') return 'bg-[var(--bg-300)] dark:bg-[var(--bg-400)]'
  if (variant === '4') return 'bg-[var(--bg-400)] dark:bg-[var(--bg-500)]'
  return ''
}

const bgClasses = ref(getBgClass(props.variant))

const productInternal = ref(props.modelValue)

watch(productInternal, val => emit('update:modelValue', val))

watch(() => props.modelValue, val => {
  productInternal.value = val
})

const items = ref<TabsItem[]>([
  {
    label: t('ui.common.labels.hospitality'),
    icon: 'i-lucide-utensils-crossed',
    value: 'hospitality'
  },
  {
    label: t('ui.common.labels.retail'),
    icon: 'i-lucide-shopping-bag',
    value: 'retail'
  }
])
</script>
