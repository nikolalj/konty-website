<template>
  <section class="py-20 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
    <UContainer>
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Text Content -->
        <div>
          <h1 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('pages.demo.hero.title') }}
          </h1>
          <p class="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {{ t('pages.demo.hero.subtitle') }}
          </p>

          <!-- Key Benefits -->
          <ul class="space-y-4 mb-8">
            <li v-for="benefit in benefits" :key="benefit.key" class="flex items-start">
              <UIcon name="i-lucide-check-circle" class="w-6 h-6 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
              <span class="text-gray-700 dark:text-gray-300">{{ t(benefit.key) }}</span>
            </li>
          </ul>

          <!-- CTA Buttons -->
          <div class="flex gap-4">
            <UButton
              size="xl"
              color="primary"
              @click="scrollToCalendar"
            >
              <UIcon name="i-lucide-calendar" class="mr-2" />
              {{ t('pages.demo.hero.scheduleButton') }}
            </UButton>
            <UButton
              size="xl"
              variant="outline"
              @click="scrollToVideo"
            >
              <UIcon name="i-lucide-play-circle" class="mr-2" />
              {{ t('pages.demo.hero.watchVideoButton') }}
            </UButton>
          </div>
        </div>

        <!-- Right Column - Calendar Widget -->
        <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 class="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            {{ t('pages.demo.hero.calendarTitle') }}
          </h3>
          <p class="text-gray-600 dark:text-gray-300 mb-6">
            {{ t('pages.demo.hero.calendarDescription') }}
          </p>

          <!-- Placeholder Calendar -->
          <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-8 text-center">
            <UIcon name="i-lucide-calendar-days" class="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p class="text-gray-500 dark:text-gray-400">
              {{ t('pages.demo.hero.calendarPlaceholder') }}
            </p>
            <UButton
              class="mt-4"
              color="primary"
              variant="soft"
              @click="openCalendly"
            >
              {{ t('pages.demo.hero.openCalendar') }}
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { track } = useTracking()

const benefits = [
  { key: 'pages.demo.hero.benefit1' },
  { key: 'pages.demo.hero.benefit2' },
  { key: 'pages.demo.hero.benefit3' },
  { key: 'pages.demo.hero.benefit4' }
]

const scrollToCalendar = () => {
  // Track demo CTA click
  track('get_a_demo_cta', { location: 'Hero' })

  // Scroll to contact form section
  const element = document.querySelector('#contact-form')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const scrollToVideo = () => {
  // Scroll to video section
  const element = document.querySelector('#demo-video')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const openCalendly = () => {
  // Track demo CTA click
  track('get_a_demo_cta', { location: 'Hero' })

  // Open Calendly in new tab or embed
  window.open('https://calendly.com/konty-demo', '_blank')
}
</script>
