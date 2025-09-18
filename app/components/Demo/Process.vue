<template>
  <section class="py-16 bg-white dark:bg-gray-900">
    <UContainer>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {{ t('pages.demo.process.title') }}
        </h2>
        <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {{ t('pages.demo.process.subtitle') }}
        </p>
      </div>

      <!-- Process Steps -->
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div
          v-for="(step, index) in steps"
          :key="step.key"
          class="relative"
        >
          <!-- Connector Line (except for last item) -->
          <div
            v-if="index < steps.length - 1"
            class="hidden lg:block absolute top-12 left-1/2 w-full h-0.5 bg-gray-300 dark:bg-gray-700"
          />

          <div class="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
            <!-- Step Number -->
            <div class="w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              {{ index + 1 }}
            </div>

            <!-- Icon -->
            <UIcon :name="step.icon" class="w-8 h-8 text-primary-500 mb-4" />

            <!-- Content -->
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              {{ t(step.title) }}
            </h3>
            <p class="text-gray-600 dark:text-gray-300 text-sm">
              {{ t(step.description) }}
            </p>

            <!-- Duration -->
            <div class="mt-4 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <UIcon name="i-heroicons-clock" class="w-4 h-4 mr-1" />
              {{ t(step.duration) }}
            </div>
          </div>
        </div>
      </div>

      <!-- What You'll Get Section -->
      <div class="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8">
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          {{ t('pages.demo.process.whatYouGet.title') }}
        </h3>
        <div class="grid md:grid-cols-3 gap-6">
          <div v-for="item in outcomes" :key="item.key" class="flex items-start">
            <UIcon name="i-heroicons-sparkles" class="w-6 h-6 text-primary-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-white mb-1">
                {{ t(item.title) }}
              </h4>
              <p class="text-sm text-gray-600 dark:text-gray-300">
                {{ t(item.description) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const steps = [
  {
    key: 'step1',
    icon: 'i-heroicons-chat-bubble-left-right',
    title: 'pages.demo.process.step1.title',
    description: 'pages.demo.process.step1.description',
    duration: 'pages.demo.process.step1.duration'
  },
  {
    key: 'step2',
    icon: 'i-heroicons-presentation-chart-line',
    title: 'pages.demo.process.step2.title',
    description: 'pages.demo.process.step2.description',
    duration: 'pages.demo.process.step2.duration'
  },
  {
    key: 'step3',
    icon: 'i-heroicons-wrench-screwdriver',
    title: 'pages.demo.process.step3.title',
    description: 'pages.demo.process.step3.description',
    duration: 'pages.demo.process.step3.duration'
  },
  {
    key: 'step4',
    icon: 'i-heroicons-rocket-launch',
    title: 'pages.demo.process.step4.title',
    description: 'pages.demo.process.step4.description',
    duration: 'pages.demo.process.step4.duration'
  }
]

const outcomes = [
  {
    key: 'outcome1',
    title: 'pages.demo.process.whatYouGet.outcome1.title',
    description: 'pages.demo.process.whatYouGet.outcome1.description'
  },
  {
    key: 'outcome2',
    title: 'pages.demo.process.whatYouGet.outcome2.title',
    description: 'pages.demo.process.whatYouGet.outcome2.description'
  },
  {
    key: 'outcome3',
    title: 'pages.demo.process.whatYouGet.outcome3.title',
    description: 'pages.demo.process.whatYouGet.outcome3.description'
  }
]
</script>