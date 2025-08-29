<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <SharedSectionHeading
        :title="$t('testimonials.title')"
        :description="$t('testimonials.description')"
      />

      <UPageMarquee
        pause-on-hover
        :ui="{ root: '[--gap:--spacing(4)]  [--duration:60s]', content: 'w-auto py-1' }"
      >
        <UPageCard
          v-for="(testimonial, index) in testimonials"
          :key="index"
          variant="subtle"
          :description="testimonial.quote"
          :ui="{
            description: 'before:content-[open-quote] after:content-[close-quote] line-clamp-4'
          }"
          class="w-80 shrink-0"
        >
          <template #footer>
            <UUser v-bind="testimonial.user" size="xl" :ui="{ description: 'line-clamp-1' }" />
          </template>
        </UPageCard>
      </UPageMarquee>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const testimonials = computed(() => {
  const testimonialKeys = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8']
  return testimonialKeys.map((key, index) => {
    return {
      user: {
        name: t(`testimonials.${key}.name`),
        description: t(`testimonials.${key}.role`),
        avatar: {
          src: `/images/testimonials/${index + 1}.jpg`,
          loading: 'lazy'
        }
      },
      quote: t(`testimonials.${key}.quote`)
    }
  })
})
</script>
