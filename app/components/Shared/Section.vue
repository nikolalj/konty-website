<template>
  <section :class="`${bgClasses} ${paddingClasses}`">
    <UContainer>
      <div
        v-if="props.title || props.description || props.productSwitch"
        class="flex flex-col items-center mb-16"
      >
        <UIAppear>
          <UTabs
            v-if="props.productSwitch && props.productSwitchPosition === 'top'"
            v-model="productInternal"
            :items="items"
            class="mt-8 w-full sm:w-lg"
          />
        </UIAppear>

        <UIAppear :animate-on="props.title">
          <component
            :is="props.headingLevel || 'h2'"
            v-if="props.title"
            class="mt-4 mb-4 text-3xl sm:text-4xl lg:text-5xl text-center text-pretty tracking-tight font-bold text-highlighted"
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
            v-if="props.productSwitch && props.productSwitchPosition === 'bottom'"
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

const { t } = useI18n()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
  paddingTop: {
    type: String as PropType<'md' | 'xl'>,
    default: 'md',
  },
  variant: {
    type: String as PropType<'1' | '2' | '3' | '4' | undefined>,
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
  productSwitchPosition: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'bottom'
  },
  headingLevel: {
    type: String as PropType<'h1' | 'h2' | 'h3'>,
    default: 'h2'
  }
})

const getBgClass = (variant: '1' | '2' | '3' | '4' | undefined) => {
  if (variant === '1') return 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]'
  if (variant === '2') return 'bg-[var(--bg-200)] dark:bg-[var(--bg-300)]'
  if (variant === '3') return 'bg-[var(--bg-300)] dark:bg-[var(--bg-400)]'
  if (variant === '4') return 'bg-[var(--bg-400)] dark:bg-[var(--bg-500)]'
  return ''
}

const getPaddingClass = (paddingTop: string) => {
  if (paddingTop === 'xl') return 'py-24 sm:py-30'
  return 'py-12 sm:py-16'
}

const bgClasses = ref(getBgClass(props.variant))
const paddingClasses = ref(getPaddingClass(props.paddingTop))

const productInternal = ref('hospitality')

watch(productInternal, val => emit('update:modelValue', val))

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
