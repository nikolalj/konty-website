<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        :title="t('pages.home.testimonials.title')"
        :description="t('pages.home.testimonials.description')"
      />

      <!-- Responsive grid: 1 column on mobile, 2 on tablet, 4 on desktop -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <article
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="flex flex-col bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6 h-full"
        >
          <!-- Quote at the top, flex-grow to push author to bottom -->
          <blockquote class="text-gray-600 dark:text-gray-300 flex-grow mb-6">
            "{{ testimonial.quote }}"
          </blockquote>

          <!-- Author details at the bottom, always aligned -->
          <div class="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
            <NuxtImg
              :src="testimonial.user.avatar.src"
              :alt="testimonial.user.name"
              format="avif"
              loading="lazy"
              width="40"
              height="40"
              quality="80"
              fit="cover"
              class="rounded-full flex-shrink-0"
            />
            <div class="min-w-0">
              <p class="font-medium text-gray-900 dark:text-white truncate">{{ testimonial.user.name }}</p>
              <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ testimonial.user.description }}</p>
            </div>
          </div>
        </article>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const testimonials = computed(() => {
  // Only use first 4 testimonials
  const testimonialKeys = ['t1', 't2', 't3', 't4']
  return testimonialKeys.map((key, index) => {
    return {
      user: {
        name: t(`pages.home.testimonials.items.${key}.name`),
        description: t(`pages.home.testimonials.items.${key}.role`),
        avatar: {
          src: `/images/testimonials/${index + 1}.jpg`,
          loading: 'lazy'
        }
      },
      quote: t(`pages.home.testimonials.items.${key}.quote`)
    }
  })
})
</script>
