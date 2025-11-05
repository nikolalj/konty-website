<template>
  <SharedSection
    :variant="props.variant"
    :title="t('pages.partners.testimonials.title')"
    :description="t('pages.partners.testimonials.description')"
  >
    <!-- Responsive grid: 1 column on mobile, 2 on tablet and desktop -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
      <article
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="flex flex-col bg-[var(--ui-bg-elevated)] rounded-lg p-6 h-full"
      >
        <!-- Title at the top -->
        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          {{ testimonial.title }}
        </h3>

        <!-- Quote, flex-grow to push author to bottom -->
        <blockquote class="text-gray-600 dark:text-gray-300 flex-grow mb-4">
          "{{ testimonial.quote }}"
        </blockquote>

        <!-- Author details at the bottom, always aligned -->
        <div class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="min-w-0">
            <p class="font-medium text-gray-900 dark:text-white truncate">{{ testimonial.user.name }}</p>
            <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ testimonial.user.company }}</p>
          </div>
        </div>
      </article>
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
})

const { t } = useI18n()

const testimonials = computed(() => {
  const testimonialKeys = ['t1', 't2']
  return testimonialKeys.map((key) => {
    return {
      user: {
        name: t(`pages.partners.testimonials.items.${key}.name`),
        company: t(`pages.partners.testimonials.items.${key}.company`),
      },
      title: t(`pages.partners.testimonials.items.${key}.title`),
      quote: t(`pages.partners.testimonials.items.${key}.quote`)
    }
  })
})
</script>
