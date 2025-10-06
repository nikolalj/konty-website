<template>
  <SharedSection
    v-model="innerProduct"
    :variant="props.variant"
    :title="t(`pages.products.${innerProduct}.features.title`)"
    :description="t(`pages.products.${innerProduct}.features.description`)"
    :product-switch="!props.product"
  >
    <div class="flex flex-col gap-12">
      <!-- Top Section: Features List and Image -->
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Left: Interactive Features List -->
        <UIAppear direction="right" :distance="32">
          <div class="space-y-2">
            <button
              v-for="(feature, index) in features[innerProduct]"
              :key="`${innerProduct}-${index}`"
              class="flex flex-col w-full text-left transition-all duration-300 p-3 rounded-xl cursor-pointer group"
              :class="[
                selectedFeature === index
                  ? 'bg-primary-600/10 dark:bg-primary-600/20'
                  : 'hover:bg-gray-100 dark:bg-primary-600/20'
              ]"
              @click="selectedFeature = index"
            >
              <!-- Icon and Title -->
              <div class="flex items-center gap-3 mb-2">
                <div
                  class="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-300 flex-shrink-0"
                  :class="[
                    selectedFeature === index
                      ? 'bg-primary-600'
                      : 'bg-primary-600/60 group-hover:bg-primary-600/80'
                  ]"
                >
                  <UIcon
                    :name="feature.icon"
                    class="h-4 w-4 text-white"
                  />
                </div>
                <h3
                  class="text-lg font-semibold transition-colors"
                  :class="[
                    selectedFeature === index
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-900 dark:text-white'
                  ]"
                >
                  {{ t(`pages.products.${innerProduct}.features.${feature.key}.title`) }}
                </h3>
              </div>

              <!-- Description -->
              <div>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t(`pages.products.${innerProduct}.features.${feature.key}.description`) }}
                </p>
              </div>
            </button>
          </div>
        </UIAppear>

        <!-- Right: Dynamic Feature Image -->
        <UIAppear
          :key="`image-${selectedFeature}`"
          direction="left"
          :distance="32"
          :animate-on="selectedFeature"
        >
          <div class="flex items-center justify-center h-full">
            <NuxtImg
              :src="activeImage"
              format="avif"
              loading="lazy"
              :alt="`${t(`pages.products.${innerProduct}.features.${features[innerProduct]?.[selectedFeature]?.key}.title`)} screenshot`"
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

      <!-- Bottom Section: Action Buttons -->
      <div class="flex gap-4 flex-wrap justify-center lg:justify-start">
        <AppCTAButton variant="primary" section="features" class="flex-1 max-w-[152px]" />
        <AppCTAButton variant="secondary" section="features" class="flex-1 max-w-[152px]" />
      </div>
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
    default: undefined
  }
})

const { t } = useI18n()

const innerProduct = ref<'hospitality' | 'retail'>(props.product || 'hospitality')

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
      icon: 'i-lucide-chart-bar',
      image: '/images/features/hospitality/feat4.avif'
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
      icon: 'i-lucide-barcode',
      image: '/images/features/retail/feat2.avif'
    },
    {
      key: 'feat3',
      icon: 'i-lucide-settings',
      image: '/images/features/retail/feat3.avif'
    },
    {
      key: 'feat4',
      icon: 'i-lucide-chart-pie',
      image: '/images/features/retail/feat4.avif'
    }
  ]
}

// Computed active image based on selected feature
const activeImage = computed(() => {
  return features[innerProduct.value]?.[selectedFeature.value]?.image || '/images/features/placeholder.avif'
})
</script>
