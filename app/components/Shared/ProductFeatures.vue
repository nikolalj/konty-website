<template>
  <SharedSection
    :variant="props.variant"
    :title="t(`pages.products.${product}.features.title`)"
    :description="t(`pages.products.${product}.features.description`)"
  >
    <div class="grid lg:grid-cols-2 gap-16 min-h-110">
      <!-- Left Column: Interactive Features List -->
      <UIAppear direction="right" :distance="32">
        <div>
          <!-- Features -->
          <div class="space-y-2 mb-12">
            <button
              v-for="(feature, index) in features[props.product]"
              :key="`${props.product}-${index}`"
              class="flex gap-4 w-full text-left transition-all duration-300 p-4 rounded-xl cursor-pointer group"
              :class="[
                selectedFeature === index
                  ? 'bg-primary-600/10 dark:bg-primary-600/20 translate-x-2'
                  : 'hover:translate-x-2 hover:bg-gray-100 dark:hover:bg-gray-800'
              ]"
              @click="selectedFeature = index"
            >
              <div class="flex-shrink-0">
                <div
                  class="flex h-12 w-12 items-center justify-center rounded-lg transition-all duration-300"
                  :class="[
                    selectedFeature === index
                      ? 'bg-primary-600'
                      : 'bg-primary-600/60 group-hover:bg-primary-600/80'
                  ]"
                >
                  <UIcon
                    :name="feature.icon"
                    class="h-6 w-6 text-white"
                  />
                </div>
              </div>
              <div class="flex-1">
                <h3
                  class="text-lg font-semibold mb-1 transition-colors"
                  :class="[
                    selectedFeature === index
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-900 dark:text-white'
                  ]"
                >
                  {{ t(`pages.products.${product}.features.${feature.key}.title`) }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t(`pages.products.${product}.features.${feature.key}.description`) }}
                </p>
              </div>
            </button>
          </div>

          <!-- Action Buttons -->
          <div class="flex gap-4 flex-wrap justify-center lg:justify-start">
            <AppCTAButton variant="primary" section="features" class="flex-1 max-w-[152px]" />
            <AppCTAButton variant="secondary" section="features" class="flex-1 max-w-[152px]" />
          </div>
        </div>
      </UIAppear>

      <!-- Right Column: Dynamic Feature Image -->
      <UIAppear
        :key="`image-${selectedFeature}`"
        direction="left"
        :distance="32"
        :animate-on="selectedFeature"
      >
        <div class="flex items-center justify-center">
          <NuxtImg
            :src="activeImage"
            format="avif"
            loading="lazy"
            :alt="`${t(`pages.products.${product}.features.${features[props.product]?.[selectedFeature]?.key}.title`)} screenshot`"
            role="presentation"
            width="600"
            height="600"
            quality="80"
            fit="inside"
            class="w-full h-auto rounded-2xl transition-transform duration-300 hover:scale-105 max-w-[600px]"
          />
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

// Selected feature index (default to first feature)
const selectedFeature = ref(0)

// Feature configuration with translation keys and images
const features = {
  hospitality: [
    {
      key: 'feat1',
      icon: 'i-lucide-layout-grid',
      image: '/images/features/hospitality/feat1.avif'
    },
    {
      key: 'feat2',
      icon: 'i-lucide-receipt-text',
      image: '/images/features/hospitality/feat2.avif'
    },
    {
      key: 'feat3',
      icon: 'i-lucide-settings',
      image: '/images/features/hospitality/feat3.avif'
    },
    {
      key: 'feat4',
      icon: 'i-lucide-utensils',
      image: '/images/features/hospitality/feat4.avif'
    },
    {
      key: 'feat5',
      icon: 'i-lucide-chart-bar',
      image: '/images/features/hospitality/feat5.avif'
    }
  ],
  retail: [
    {
      key: 'feat1',
      icon: 'i-lucide-shopping-cart',
      image: '/images/features/retail/feat1.avif'
    },
    {
      key: 'feat2',
      icon: 'i-lucide-settings',
      image: '/images/features/retail/feat2.avif'
    },
    {
      key: 'feat3',
      icon: 'i-lucide-chart-pie',
      image: '/images/features/retail/feat3.avif'
    },
    {
      key: 'feat4',
      icon: 'i-lucide-barcode',
      image: '/images/features/retail/feat4.avif'
    },
    {
      key: 'feat5',
      icon: 'i-lucide-package',
      image: '/images/features/retail/feat5.avif'
    }
  ]
}

// Computed active image based on selected feature
const activeImage = computed(() => {
  return features[props.product]?.[selectedFeature.value]?.image || '/images/features/placeholder.avif'
})
</script>
