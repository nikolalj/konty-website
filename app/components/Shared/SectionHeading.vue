<template>
  <div class="flex flex-col items-center mb-16">

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
</template>

<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

const { t } = useI18n()
const emit = defineEmits(['update:modelValue'])

const props = defineProps({
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

const productInternal = ref('kontyHospitality')

watch(productInternal, val => emit('update:modelValue', val))

const items = ref<TabsItem[]>([
  {
    label: t('common.hospitality'),
    icon: 'i-lucide-utensils-crossed',
    value: 'kontyHospitality'
  },
  {
    label: t('common.retail'),
    icon: 'i-lucide-shopping-bag',
    value: 'kontyRetail'
  }
])
</script>
