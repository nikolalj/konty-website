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

// Avatar images for testimonials
const avatarImages = [
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/60.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/71.jpg',
  'https://randomuser.me/api/portraits/women/25.jpg',
  'https://randomuser.me/api/portraits/men/84.jpg',
  'https://randomuser.me/api/portraits/women/95.jpg'
]

const testimonials = computed(() => {
  const testimonialKeys = ['t1', 't2', 't3', 't4', 't5', 't6', 't7', 't8']
  return testimonialKeys.map((key, index) => {
    return {
      user: {
        name: t(`testimonials.${key}.name`),
        description: t(`testimonials.${key}.role`),
        avatar: {
          src: avatarImages[index],
          loading: 'lazy'
        }
      },
      quote: t(`testimonials.${key}.quote`)
    }
  })
})
</script>
