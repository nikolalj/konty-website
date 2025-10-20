<template>
  <SharedSection
    :title="t('pages.demo.expectations.title')"
    :description="t('pages.demo.expectations.subtitle')"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr">
      <UIAppear
        v-for="(item, index) in expectations"
        :key="`expectation-${index}`"
        direction="up"
        :distance="32"
        :delay="index * 100"
        class="h-full"
      >
        <div class="group p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-elevated hover:border-primary-500 dark:hover:border-primary-600 transition-all duration-300 hover:shadow-lg h-full flex flex-col">
          <!-- Icon -->
          <div class="mb-4">
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300">
              <UIcon :name="item.icon" class="h-6 w-6" />
            </div>
          </div>

          <!-- Title -->
          <h3 class="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
            {{ t(item.title) }}
          </h3>

          <!-- Description -->
          <p class="text-gray-600 dark:text-gray-300 leading-relaxed flex-1">
            {{ t(item.description) }}
          </p>
        </div>
      </UIAppear>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
const { t } = useI18n()

const expectations = [
  {
    icon: 'i-lucide-presentation',
    title: 'pages.demo.expectations.items.personalized.title',
    description: 'pages.demo.expectations.items.personalized.description'
  },
  {
    icon: 'i-lucide-store',
    title: 'pages.demo.expectations.items.tailored.title',
    description: 'pages.demo.expectations.items.tailored.description'
  },
  {
    icon: 'i-lucide-clock',
    title: 'pages.demo.expectations.items.duration.title',
    description: 'pages.demo.expectations.items.duration.description'
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'pages.demo.expectations.items.qa.title',
    description: 'pages.demo.expectations.items.qa.description'
  },
  {
    icon: 'i-lucide-rocket',
    title: 'pages.demo.expectations.items.implementation.title',
    description: 'pages.demo.expectations.items.implementation.description'
  },
  {
    icon: 'i-lucide-gift',
    title: 'pages.demo.expectations.items.trial.title',
    description: 'pages.demo.expectations.items.trial.description'
  }
]
</script>
