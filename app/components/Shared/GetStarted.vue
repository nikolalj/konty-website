<template>
  <SharedSection
    :variant="props.variant"
    :title="t('pages.home.getStarted.title')"
    :description="t('pages.home.getStarted.description')"
  >
    <UIAppear direction="down" :distance="32">
      <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 items-stretch">
          <div
            v-for="(step, index) in steps"
            :key="`step-${index}`"
            class="group flex flex-col relative"
          >
            <!-- Image with Step Number -->
            <div class="relative">
              <div class="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 aspect-[4/3]">
                <div class="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 transition-transform duration-300 group-hover:scale-110" />

                <div class="absolute z-10 inset-y-0 left-0 w-12 bg-primary-500/20 backdrop-blur-sm flex items-center justify-center">
                  <span class="text-2xl font-bold text-primary-600 dark:text-primary-400">{{ index + 1 }}</span>
                </div>

                <NuxtImg
                  v-if="step.image"
                  :src="step.image"
                  :alt="step.title"
                  loading="lazy"
                  class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <!-- Chevron positioned outside overflow container -->
              <div
                v-if="index < steps.length - 1"
                class="hidden lg:flex absolute top-1/2 -translate-y-1/2 -right-7 z-30"
              >
                <UIcon name="i-lucide-chevron-right" class="w-6 h-6 text-gray-400" />
              </div>
            </div>

            <!-- Content -->
            <div class="pt-4 flex flex-col flex-1">
              <p class="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
                {{ step.tagline }}
              </p>
              <h3 class="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-2">
                {{ step.title }}
              </h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
                {{ step.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  }
})

const { t } = useI18n()

const steps = computed(() =>
  [1, 2, 3, 4].map(num => ({
    tagline: t(`pages.home.getStarted.step${num}.tagline`),
    title: t(`pages.home.getStarted.step${num}.title`),
    description: t(`pages.home.getStarted.step${num}.description`),
    image: '/images/features/hospitality.avif'
  }))
)
</script>
