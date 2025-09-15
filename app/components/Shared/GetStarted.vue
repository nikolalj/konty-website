<template>
  <SharedSection
    :variant="props.variant"
    :title="t('pages.home.getStarted.title')"
    :description="t('pages.home.getStarted.description')"
  >
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <div class="space-y-6">
          <a
            v-for="feature in features"
            :key="feature.title"
            :href="feature.to"
            class="flex gap-4 p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div class="flex-shrink-0 flex items-center">
              <Icon :name="feature.icon" class="w-8 h-8 text-primary-500" />
            </div>
            <div class="flex-1">
              <h3 class="font-semibold mb-1">{{ feature.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ feature.description }}</p>
            </div>
          </a>
        </div>
      </div>

      <!-- Image -->
      <UIAppear>
        <NuxtImg
          src="/images/getstarted/getstarted.avif"
          format="avif"
          loading="lazy"
          alt="Get started image"
          role="presentation"
          width="500"
          height="500"
          quality="80"
          fit="inside"
          class="transition-transform duration-300 hover:scale-105 w-full h-auto"
        />
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
  }
})

const { t } = useI18n()
const localePath = useLocalePath()

const features = computed(() => [
  {
    title: t('pages.home.getStarted.certificate.title'),
    description: t('pages.home.getStarted.certificate.description'),
    icon: 'i-lucide-shield-check',
    to: localePath('#')
  },
  {
    title: t('pages.home.getStarted.sepPortal.title'),
    description: t('pages.home.getStarted.sepPortal.description'),
    icon: 'i-lucide-user-round-pen',
    to: localePath('#')
  },
  {
    title: t('pages.home.getStarted.equipment.title'),
    description: t('pages.home.getStarted.equipment.description'),
    icon: 'i-lucide-smartphone',
    to: localePath('#')
  },
  {
    title: t('pages.home.getStarted.register.title'),
    description: t('pages.home.getStarted.register.description'),
    icon: 'i-lucide-user-round-check',
    to: localePath('#')
  }
])
</script>
