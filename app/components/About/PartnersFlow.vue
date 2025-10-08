<template>
  <SharedSection
    :variant="props.variant"
    :title="t('pages.partners.flow.title')"
    :description="t('pages.partners.flow.description')"
  >
    <UIAppear direction="up">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="flex flex-col items-center text-center"
          >
            <!-- Step number circle -->
            <div class="relative mb-6">
              <div class="flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-white text-2xl font-bold mx-auto relative z-10">
                {{ index + 1 }}
              </div>
              <!-- Connecting line (hide on last item) -->
              <!-- Line goes from center of current circle to center of next circle -->
              <!-- From right edge (left-1/2 + 2rem [half circle]) to next circle center (100% [full column] + 2rem [gap] + 2rem [half next circle]) -->
              <div
                v-if="index < steps.length - 1"
                class="hidden md:block absolute top-8 h-0.5 bg-primary-200 dark:bg-primary-800"
                style="left: calc(50% + 2rem); width: calc(100% + 2rem);"
              />
            </div>

            <!-- Icon -->
            <div class="mb-4">
              <UIcon
                :name="step.icon"
                class="h-8 w-8 text-primary-600 dark:text-primary-400"
              />
            </div>

            <!-- Title -->
            <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
              {{ t(`pages.partners.flow.steps.step${index + 1}.title`) }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-gray-600 dark:text-gray-300">
              {{ t(`pages.partners.flow.steps.step${index + 1}.description`) }}
            </p>
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
  },
})

const { t } = useI18n()

const steps = [
  { icon: 'i-lucide-mail' },
  { icon: 'i-lucide-handshake' },
  { icon: 'i-lucide-graduation-cap' },
  { icon: 'i-lucide-rocket' }
]
</script>
