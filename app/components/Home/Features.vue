<template>
  <SharedSection
    v-model="product"
    :title="t(`pages.products.features.title`)"
    :description="t(`pages.products.features.description`)"
    :product-switch="true"
  >
    <div
      class="grid lg:grid-cols-2 gap-16 min-h-110"
    >
      <UIAppear
        :key="`image-${product}`"
        direction="right"
        :distance="32"
        :animate-on="product"
      >
        <div>
          <NuxtImg
            :src="featureImages[product]"
            format="avif"
            loading="lazy"
            :alt="product === 'hospitality' ? 'Hospitality features' : 'Retail features'"
            role="presentation"
            width="500"
            height="500"
            quality="80"
            fit="inside"
            class="w-full h-auto rounded-2xl transition-transform duration-300 hover:scale-105"
          />
        </div>
      </UIAppear>

      <UIAppear
        :key="`content-${product}`"
        direction="left"
        :distance="32"
        :animate-on="product"
      >
        <div>
          <!-- Features -->
          <div class="space-y-8 mb-8">
            <div
              v-for="(feature, index) in features[product]"
              :key="`${product}-${index}`"
              class="flex gap-4 transition-all duration-300 hover:translate-x-2"
            >
              <div class="flex-shrink-0">
                <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600/60">
                  <UIcon
                    :name="feature.icon"
                    class="h-6 w-6 text-white"
                  />
                </div>
              </div>
              <div>
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {{ t(`pages.products.features.${productKey}.${feature.key}.title`) }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t(`pages.products.features.${productKey}.${feature.key}.description`) }}
                </p>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex ml-0 sm:ml-15 gap-4 flex-wrap justify-center sm:justify-start">
            <AppCTAButton variant="primary" section="features" class="flex-1 max-w-[152px]" />
            <AppCTAButton variant="secondary" section="features" class="flex-1 max-w-[152px]" />
          </div>
        </div>
      </UIAppear>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
const { t } = useI18n()
const product = ref<'hospitality' | 'retail'>('hospitality')

// Feature images (could be moved to static assets later)
const featureImages = {
  hospitality: '/images/features/hospitality.avif',
  retail: '/images/features/retail.avif'
}

const productKey = computed(() => product.value === 'hospitality' ? 'hospitality' : 'retail')

// Feature configuration with translation keys
const features = {
  hospitality: [
    { key: 'feat1', icon: 'i-lucide-layout-grid' },
    { key: 'feat2', icon: 'i-lucide-receipt-text' },
    { key: 'feat3', icon: 'i-lucide-settings' }
  ],
  retail: [
    { key: 'feat1', icon: 'i-lucide-shopping-cart' },
    { key: 'feat2', icon: 'i-lucide-settings' },
    { key: 'feat3', icon: 'i-lucide-chart-pie' }
  ]
}
</script>
