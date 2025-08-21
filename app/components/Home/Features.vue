<template>
  <section class="py-10 bg-[var(--bg-100)] dark:bg-[var(--bg-200)]">
    <UContainer>
      <SharedSectionHeading
        v-model="product"
        :title="$t(`features.${productKey}.title`)"
        :description="$t(`features.${productKey}.description`)"
        :product-switch="true"
        product-switch-position="top"
      />

      <div
        :key="product"
        class="grid lg:grid-cols-2 gap-16 min-h-110"
      >
        <UIAppear direction="right" :distance="32" :animate-on="product">
          <div :class="product !== 'kontyRetail' ? 'lg:order-2' : 'lg:order-1'">
            <UILazyImage
              :src="featureImages[product]"
              preset=""
              :sizes="'100vw'"
              loading="eager"
              fetchpriority="high"
              alt=""
              role="presentation"
              class="w-full h-auto rounded-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </UIAppear>

        <UIAppear direction="left" :distance="32" :animate-on="product">
          <div :class="product !== 'kontyRetail' ? 'lg:order-1' : 'lg:order-2'">
            <!-- Features -->
            <div class="space-y-8 mb-12">
              <div
                v-for="(feature, index) in features[product]"
                :key="`${product}-${index}`"
                class="flex gap-4 transition-all duration-300 hover:translate-x-2"
              >
                <div class="flex-shrink-0">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-900/50">
                    <UIcon
                      :name="feature.icon"
                      class="h-6 w-6 text-white"
                    />
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ $t(`features.${productKey}.${feature.key}.title`) }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ $t(`features.${productKey}.${feature.key}.description`) }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                v-for="(link, index) in links[product]"
                :key="`${product}-${index}`"
                :to="link.to ? localePath(link.to) : undefined"
                :color="link.color"
                :variant="link.variant"
                :trailing-icon="link.trailingIcon"
                size="lg"
                class="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              >
                {{ $t(link.labelKey) }}
              </UButton>
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const product: Ref<'kontyHospitality' | 'kontyRetail'> = ref('kontyHospitality')

// Feature images (could be moved to static assets later)
const featureImages = {
  kontyHospitality: 'https://media.istockphoto.com/id/1271319044/photo/small-business-people-and-service-concept-happy-man-or-waiter-in-apron-at-counter-with.jpg?s=1024x1024&w=is&k=20&c=zcF6uTfA_cAEG-X9xrBwb5LaPnK_set4tCuPgFOiX98=',
  kontyRetail: 'https://media.istockphoto.com/id/2170880602/photo/smiling-baker-assisting-customer-in-cozy-artisan-bakery.jpg?s=1024x1024&w=is&k=20&c=hWdPeyIaXXQP8EOoYSCdqXY23OUDuwl71fnVIjGeNoc='
}

const productKey = computed(() => product.value === 'kontyHospitality' ? 'hospitality' : 'retail')

// Feature configuration with translation keys
const features = {
  kontyHospitality: [
    {
      key: 'tableManagement',
      icon: 'i-lucide-layout-grid'
    },
    {
      key: 'kitchenDisplay',
      icon: 'i-lucide-chef-hat'
    },
    {
      key: 'staffManagement',
      icon: 'i-lucide-users'
    }
  ],
  kontyRetail: [
    {
      key: 'inventory',
      icon: 'i-lucide-package'
    },
    {
      key: 'customerInsights',
      icon: 'i-lucide-user-check'
    },
    {
      key: 'salesAnalytics',
      icon: 'i-lucide-trending-up'
    }
  ]
}

// Custom type for links with labelKey
interface FeatureLink {
  labelKey: string
  to: string
  color: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
  variant: 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link'
  trailingIcon: string
}

// Links configuration with translation keys
const links: Record<string, FeatureLink[]> = {
  kontyHospitality: [
    {
      labelKey: 'features.hospitality.exploreFeatures',
      to: '/konty-hospitality',
      color: 'primary',
      variant: 'solid',
      trailingIcon: 'i-lucide-arrow-right'
    },
    {
      labelKey: 'features.hospitality.scheduleDemo',
      to: '/demo',
      color: 'neutral',
      variant: 'subtle',
      trailingIcon: 'i-lucide-calendar'
    }
  ],
  kontyRetail: [
    {
      labelKey: 'features.retail.exploreFeatures',
      to: '/konty-retail',
      color: 'primary',
      variant: 'solid',
      trailingIcon: 'i-lucide-arrow-right'
    },
    {
      labelKey: 'features.retail.startFree',
      to: '/demo',
      color: 'neutral',
      variant: 'outline',
      trailingIcon: 'i-lucide-play-circle'
    }
  ]
}

</script>
