<template>
  <SharedSection
    :variant="props.variant"
    :title="sectionData[props.category].title"
    :description="sectionData[props.category].description"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      <UIAppear
        v-for="(benefit, index) in benefits[props.category]"
        :key="`${props.category}-benefit-${index}`"
        direction="up"
        :distance="32"
        :delay="index * 100"
        class="h-full"
      >
        <div class="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-elevated hover:border-primary-500 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
          <!-- Icon -->
          <div class="mb-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <UIcon :name="benefit.icon" class="h-6 w-6" />
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {{ benefit.title }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
            {{ benefit.description }}
          </p>
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
  category: {
    type: String as PropType<'hospitality' | 'retail' | 'partners'>,
    required: true
  }
})

const { t } = useI18n()

// Section metadata (title and description) - translated
const sectionData = {
  hospitality: {
    title: t('pages.products.hospitality.benefits.title'),
    description: t('pages.products.hospitality.benefits.description')
  },
  retail: {
    title: t('pages.products.retail.benefits.title'),
    description: t('pages.products.retail.benefits.description')
  },
  partners: {
    title: t('pages.partners.benefits.title'),
    description: t('pages.partners.benefits.description')
  }
}

// Benefits configuration - translated
const benefits = {
  hospitality: [
    {
      key: 'benefit1',
      icon: 'i-lucide-settings',
      title: t('pages.products.hospitality.benefits.benefit1.title'),
      description: t('pages.products.hospitality.benefits.benefit1.description')
    },
    {
      key: 'benefit2',
      icon: 'i-lucide-zap',
      title: t('pages.products.hospitality.benefits.benefit2.title'),
      description: t('pages.products.hospitality.benefits.benefit2.description')
    },
    {
      key: 'benefit3',
      icon: 'i-lucide-shield-check',
      title: t('pages.products.hospitality.benefits.benefit3.title'),
      description: t('pages.products.hospitality.benefits.benefit3.description')
    },
    {
      key: 'benefit4',
      icon: 'i-lucide-globe',
      title: t('pages.products.hospitality.benefits.benefit4.title'),
      description: t('pages.products.hospitality.benefits.benefit4.description')
    },
    {
      key: 'benefit5',
      icon: 'i-lucide-bar-chart',
      title: t('pages.products.hospitality.benefits.benefit5.title'),
      description: t('pages.products.hospitality.benefits.benefit5.description')
    },
    {
      key: 'benefit6',
      icon: 'i-lucide-headphones',
      title: t('pages.products.hospitality.benefits.benefit6.title'),
      description: t('pages.products.hospitality.benefits.benefit6.description')
    }
  ],
  retail: [
    {
      key: 'benefit1',
      icon: 'i-lucide-settings',
      title: t('pages.products.retail.benefits.benefit1.title'),
      description: t('pages.products.retail.benefits.benefit1.description')
    },
    {
      key: 'benefit2',
      icon: 'i-lucide-zap',
      title: t('pages.products.retail.benefits.benefit2.title'),
      description: t('pages.products.retail.benefits.benefit2.description')
    },
    {
      key: 'benefit3',
      icon: 'i-lucide-shield-check',
      title: t('pages.products.retail.benefits.benefit3.title'),
      description: t('pages.products.retail.benefits.benefit3.description')
    },
    {
      key: 'benefit4',
      icon: 'i-lucide-globe',
      title: t('pages.products.retail.benefits.benefit4.title'),
      description: t('pages.products.retail.benefits.benefit4.description')
    },
    {
      key: 'benefit5',
      icon: 'i-lucide-bar-chart',
      title: t('pages.products.retail.benefits.benefit5.title'),
      description: t('pages.products.retail.benefits.benefit5.description')
    },
    {
      key: 'benefit6',
      icon: 'i-lucide-headphones',
      title: t('pages.products.retail.benefits.benefit6.title'),
      description: t('pages.products.retail.benefits.benefit6.description')
    }
  ],
  partners: [
    {
      key: 'benefit1',
      icon: 'i-lucide-dollar-sign',
      title: t('pages.partners.benefits.benefit1.title'),
      description: t('pages.partners.benefits.benefit1.description')
    },
    {
      key: 'benefit2',
      icon: 'i-lucide-award',
      title: t('pages.partners.benefits.benefit2.title'),
      description: t('pages.partners.benefits.benefit2.description')
    },
    {
      key: 'benefit3',
      icon: 'i-lucide-graduation-cap',
      title: t('pages.partners.benefits.benefit3.title'),
      description: t('pages.partners.benefits.benefit3.description')
    },
    {
      key: 'benefit4',
      icon: 'i-lucide-headset',
      title: t('pages.partners.benefits.benefit4.title'),
      description: t('pages.partners.benefits.benefit4.description')
    },
    {
      key: 'benefit5',
      icon: 'i-lucide-megaphone',
      title: t('pages.partners.benefits.benefit5.title'),
      description: t('pages.partners.benefits.benefit5.description')
    },
    {
      key: 'benefit6',
      icon: 'i-lucide-trending-up',
      title: t('pages.partners.benefits.benefit6.title'),
      description: t('pages.partners.benefits.benefit6.description')
    }
  ]
}
</script>
