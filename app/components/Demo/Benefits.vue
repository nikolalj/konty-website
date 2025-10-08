<template>
  <section class="py-16 bg-white dark:bg-gray-900">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('pages.demo.benefits.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ t('pages.demo.benefits.subtitle') }}
        </p>
      </div>

      <!-- Benefits Grid -->
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        <div
          v-for="(benefit, index) in benefits"
          :key="`benefit-${index}`"
          class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6"
        >
          <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center mb-4">
            <UIcon :name="benefit.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            {{ t(benefit.title) }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 text-sm">
            {{ t(benefit.description) }}
          </p>
        </div>
      </div>

      <!-- Additional Details -->
      <div class="bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 text-center">
        <p class="text-gray-700 dark:text-gray-300">
          {{ t('pages.demo.benefits.details') }}
        </p>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const benefits = [
  {
    icon: 'i-lucide-presentation',
    title: 'pages.demo.benefits.benefit1.title',
    description: 'pages.demo.benefits.benefit1.description'
  },
  {
    icon: 'i-lucide-store',
    title: 'pages.demo.benefits.benefit2.title',
    description: 'pages.demo.benefits.benefit2.description'
  },
  {
    icon: 'i-lucide-clock',
    title: 'pages.demo.benefits.benefit3.title',
    description: 'pages.demo.benefits.benefit3.description'
  },
  {
    icon: 'i-lucide-message-circle',
    title: 'pages.demo.benefits.benefit4.title',
    description: 'pages.demo.benefits.benefit4.description'
  },
  {
    icon: 'i-lucide-rocket',
    title: 'pages.demo.benefits.benefit5.title',
    description: 'pages.demo.benefits.benefit5.description'
  }
]
</script>
