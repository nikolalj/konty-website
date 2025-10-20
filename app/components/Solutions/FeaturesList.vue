<template>
  <SharedSection
    variant="alt"
    :title="t(`pages.solutions.${solution}.features.title`)"
    :description="t(`pages.solutions.${solution}.features.description`)"
  >
    <UIAppear direction="up">
      <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <div
          v-for="(feature, index) in features"
          :key="`feat-${index}`"
          class="group p-6 text-center"
        >
          <div class="flex justify-center mb-4">
            <div
              class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300"
            >
              <UIcon :name="feature.icon" class="h-6 w-6" />
            </div>
          </div>

          <h3 class="text-xl font-semibold mb-2 text-highlighted">
            {{ feature.title }}
          </h3>

          <p class="text-muted">
            {{ feature.description }}
          </p>
        </div>
      </div>
    </UIAppear>

    <!-- CTA Buttons -->
    <div class="flex gap-3 justify-center mt-4 lg:mt-0">
      <AppCTAButton
        variant="primary"
        size="lg"
        section="footer"
        custom-class="justify-between"
      />
      <AppCTAButton
        variant="secondary"
        size="lg"
        section="footer"
        custom-class="justify-between"
      />
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
const { t } = useI18n()

interface Feature {
  title: string
  description: string
  icon: string
}

const props = defineProps({
  solution: {
    type: String,
    required: true
  },
  showCta: {
    type: Boolean,
    default: true
  }
})

const features = computed<Feature[]>(() => {
  const featuresList: Feature[] = []
  let itemIndex = 1

  while (true) {
    const key = `pages.solutions.${props.solution}.features.feat${itemIndex}`
    const title = t(`${key}.title`, '')

    if (!title) break

    featuresList.push({
      title,
      description: t(`${key}.description`, ''),
      icon: t(`${key}.icon`, 'i-heroicons-check-circle')
    })

    itemIndex++
  }

  return featuresList
})
</script>
