<template>
  <SharedSection
    v-model="innerProduct"
    :variant="props.variant"
    :title="t(`pages.products.${innerProduct}.features.title`)"
    :description="t(`pages.products.${innerProduct}.features.description`)"
    :product-switch="!props.product"
  >
    <div class="flex flex-col gap-12 w-full">
      <!-- Top Section: Features List and Image -->
      <div class="grid lg:grid-cols-2 gap-16">
        <!-- Left: Interactive Features List -->
        <UIAppear direction="right" :distance="32" :class="{ 'lg:order-2': props.reverse }">
          <div class="flex flex-col gap-4">
            <div class="space-y-1">
              <button
                v-for="(feature, index) in features[innerProduct]"
                :key="`${innerProduct}-${index}`"
                class="flex items-center gap-3 w-full text-left transition-all duration-300 p-2 rounded-lg cursor-pointer group"
                :class="[
                  selectedFeature === index
                    ? 'bg-primary-600/10 dark:bg-primary-600/20'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                ]"
                @click="selectedFeature = index"
              >
                <div
                  class="flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-300 flex-shrink-0"
                  :class="[
                    selectedFeature === index
                      ? 'bg-primary-600'
                      : 'bg-primary-600/50 group-hover:bg-primary-600/80'
                  ]"
                >
                  <UIcon
                    :name="feature.icon"
                    class="h-5 w-5 text-white"
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
              </button>
            </div>

            <!-- Action Button -->
            <div class="mx-2 mt-4 flex gap-2">
              <AppCTAButton variant="primary" section="features" />
              <AppCTAButton
                variant="custom"
                section="features"
                :custom-label="t('ui.cta.tertiary')"
                :custom-to="`/products/${innerProduct}/features`"
              />
            </div>
          </div>
        </UIAppear>

        <!-- Right: Dynamic Feature Image with Description -->
        <UIAppear
          direction="left"
          :distance="32"
          :class="{ 'lg:order-1': props.reverse }"
        >
          <div class="flex flex-col gap-4 h-full w-full">
            <div class="flex items-center justify-center w-full">
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
                class="w-full h-auto rounded-2xl"
              />
            </div>
            <div class="text-gray-600 dark:text-gray-300 min-h-[80px] w-full">
              {{ t(`pages.products.${innerProduct}.features.${features[innerProduct]?.[selectedFeature]?.key}.description`) }}
            </div>
          </div>
        </UIAppear>
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
  },
  reverse: {
    type: Boolean,
    default: false
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
    },
    {
      key: 'feat5',
      icon: 'i-lucide-globe',
      image: '/images/features/hospitality/feat5.avif'
    },
    {
      key: 'feat6',
      icon: 'i-lucide-headset',
      image: '/images/features/hospitality/feat1.avif'
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
    },
    {
      key: 'feat5',
      icon: 'i-lucide-package',
      image: '/images/features/retail/feat5.avif'
    },
    {
      key: 'feat6',
      icon: 'i-lucide-headset',
      image: '/images/features/retail/feat1.avif'
    }
  ]
}

// Computed active image based on selected feature
const activeImage = computed(() => {
  return features[innerProduct.value]?.[selectedFeature.value]?.image || '/images/features/placeholder.avif'
})
</script>
