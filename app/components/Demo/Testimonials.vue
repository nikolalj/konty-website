<template>
  <SharedSection
    :title="t('pages.demo.testimonials.title')"
    :description="t('pages.demo.testimonials.subtitle')"
  >
    <!-- Testimonials Grid -->
    <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
      <UIAppear
        v-for="(testimonial, index) in testimonials"
        :key="`testimonial-${index}`"
        direction="up"
        :delay="index * 100"
      >
        <div class="bg-[var(--ui-bg-elevated)] rounded-xl p-6 shadow-lg h-full flex flex-col">
          <!-- Timeline Badge - Top -->
          <div class="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 text-green-600 dark:text-green-400 rounded-lg text-sm font-semibold mb-4 w-fit">
            <UIcon name="i-lucide-zap" class="w-4 h-4 mr-1.5" />
            {{ t(testimonial.timeline) }}
          </div>

          <!-- Quote -->
          <blockquote class="text-gray-700 dark:text-gray-300 mb-6 flex-grow italic">
            "{{ t(testimonial.quote) }}"
          </blockquote>

          <!-- Author -->
          <div class="flex items-center pt-4 border-t border-gray-200 dark:border-gray-700">
            <div class="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mr-3 flex items-center justify-center flex-shrink-0">
              <UIcon name="i-lucide-user" class="w-6 h-6 text-white" />
            </div>
            <div class="min-w-0">
              <div class="font-semibold text-gray-900 dark:text-white">
                {{ t(testimonial.author) }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                {{ t(testimonial.role) }}
              </div>
            </div>
          </div>
        </div>
      </UIAppear>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
const { t } = useI18n()

const testimonials = [
  {
    quote: 'pages.demo.testimonials.testimonial1.quote',
    author: 'pages.demo.testimonials.testimonial1.author',
    role: 'pages.demo.testimonials.testimonial1.role',
    timeline: 'pages.demo.testimonials.testimonial1.timeline'
  },
  {
    quote: 'pages.demo.testimonials.testimonial2.quote',
    author: 'pages.demo.testimonials.testimonial2.author',
    role: 'pages.demo.testimonials.testimonial2.role',
    timeline: 'pages.demo.testimonials.testimonial2.timeline'
  },
  {
    quote: 'pages.demo.testimonials.testimonial3.quote',
    author: 'pages.demo.testimonials.testimonial3.author',
    role: 'pages.demo.testimonials.testimonial3.role',
    timeline: 'pages.demo.testimonials.testimonial3.timeline'
  }
]
</script>
