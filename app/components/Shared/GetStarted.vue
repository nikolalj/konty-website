<template>
  <SharedSection
    :variant="props.variant"
    :title="t('pages.home.getStarted.title')"
    :description="t('pages.home.getStarted.description')"
  >
    <UIAppear direction="down" :distance="32">
      <div class="w-full">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16 items-stretch">
          <div
            v-for="(step, index) in steps"
            :key="`step-${index}`"
            class="group flex flex-col relative"
          >
            <!-- Step Card -->
            <div class="relative">
              <div class="flex overflow-hidden aspect-[16/9]">
                <!-- Strip with number -->
                <div class="w-10 bg-[#c4b4ff] flex items-center justify-center flex-shrink-0">
                  <span class="text-2xl font-bold text-primary">{{ index + 1 }}</span>
                </div>

                <!-- Icon area with gradient -->
                <div class="relative flex-1 bg-gradient-to-r from-[#ede9fe] to-transparent">
                  <div class="absolute inset-0 flex items-center justify-center">
                    <UIcon :name="step.icon" class="w-20 h-20 text-primary [&_*]:[stroke-width:1.1]" />
                  </div>
                </div>
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

const steps = [
  {
    tagline: t('pages.home.getStarted.step1.tagline'),
    title: t('pages.home.getStarted.step1.title'),
    description: t('pages.home.getStarted.step1.description'),
    icon: 'i-lucide-phone-incoming'
  },
  {
    tagline: t('pages.home.getStarted.step2.tagline'),
    title: t('pages.home.getStarted.step2.title'),
    description: t('pages.home.getStarted.step2.description'),
    icon: 'i-lucide-folder-check'
  },
  {
    tagline: t('pages.home.getStarted.step3.tagline'),
    title: t('pages.home.getStarted.step3.title'),
    description: t('pages.home.getStarted.step3.description'),
    icon: 'i-lucide-monitor'
  },
  {
    tagline: t('pages.home.getStarted.step4.tagline'),
    title: t('pages.home.getStarted.step4.title'),
    description: t('pages.home.getStarted.step4.description'),
    icon: 'i-lucide-rocket'
  }
]
</script>
