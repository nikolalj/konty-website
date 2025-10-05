<template>
  <SharedSection
    :variant="props.variant"
    :title="t(`pages.products.${product}.benefits.title`)"
    :description="t(`pages.products.${product}.benefits.description`)"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      <UIAppear
        v-for="(benefit, index) in benefits[props.product]"
        :key="`${props.product}-benefit-${index}`"
        direction="up"
        :distance="32"
        :delay="index * 100"
        class="h-full"
      >
        <div class="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-elevated hover:border-primary-500 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
          <!-- Icon -->
          <div class="mb-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <UIcon :name="benefit.icon" class="h-6 w-6" />
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {{ t(`pages.products.${product}.benefits.${benefit.key}.title`) }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
            {{ t(`pages.products.${product}.benefits.${benefit.key}.description`) }}
          </p>
        </div>
      </UIAppear>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'hospitality' | 'retail'>,
    required: true
  }
})

const { t } = useI18n()

// Benefits configuration with translation keys and icons
const benefits = {
  hospitality: [
    {
      key: 'benefit1',
      icon: 'i-lucide-settings'
    },
    {
      key: 'benefit2',
      icon: 'i-lucide-zap'
    },
    {
      key: 'benefit3',
      icon: 'i-lucide-shield-check'
    },
    {
      key: 'benefit4',
      icon: 'i-lucide-globe'
    },
    {
      key: 'benefit5',
      icon: 'i-lucide-bar-chart'
    },
    {
      key: 'benefit6',
      icon: 'i-lucide-headphones'
    }
  ],
  retail: [
    {
      key: 'benefit1',
      icon: 'i-lucide-settings'
    },
    {
      key: 'benefit2',
      icon: 'i-lucide-zap'
    },
    {
      key: 'benefit3',
      icon: 'i-lucide-shield-check'
    },
    {
      key: 'benefit4',
      icon: 'i-lucide-globe'
    },
    {
      key: 'benefit5',
      icon: 'i-lucide-bar-chart'
    },
    {
      key: 'benefit6',
      icon: 'i-lucide-headphones'
    }
  ]
}
</script>
