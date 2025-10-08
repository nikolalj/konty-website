<template>
  <SharedSection
    :variant="props.variant"
    :title="t('pages.partners.support.title')"
    :description="t('pages.partners.support.description')"
  >
    <UIAppear direction="up">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="(support, index) in supportTypes"
          :key="index"
          class="group p-8 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-elevated hover:border-primary-500 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg"
        >
          <!-- Icon -->
          <div class="mb-6">
            <div class="inline-flex h-14 w-14 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <UIcon :name="support.icon" class="h-7 w-7" />
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {{ t(`pages.partners.support.types.${support.key}.title`) }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            {{ t(`pages.partners.support.types.${support.key}.description`) }}
          </p>

          <!-- Features list -->
          <ul class="space-y-3">
            <li
              v-for="i in support.featureCount"
              :key="i"
              class="flex items-start gap-2"
            >
              <UIcon
                name="i-lucide-check"
                class="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5"
              />
              <span class="text-sm text-gray-700 dark:text-gray-300">
                {{ t(`pages.partners.support.types.${support.key}.features.feature${i}`) }}
              </span>
            </li>
          </ul>
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

const supportTypes = [
  {
    key: 'technical',
    icon: 'i-lucide-wrench',
    featureCount: 4
  },
  {
    key: 'commercial',
    icon: 'i-lucide-briefcase',
    featureCount: 4
  },
  {
    key: 'marketing',
    icon: 'i-lucide-megaphone',
    featureCount: 4
  }
]
</script>
