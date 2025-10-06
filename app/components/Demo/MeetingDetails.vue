<template>
  <section class="py-16 bg-white dark:bg-gray-900">
    <UContainer>
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Left Column - Meeting Details -->
        <div>
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            {{ t('pages.demo.meetingDetails.title') }}
          </h2>

          <div class="space-y-6">
            <!-- Meeting Format -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-video" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div class="ml-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{ t('pages.demo.meetingDetails.format.title') }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('pages.demo.meetingDetails.format.description') }}
                </p>
              </div>
            </div>

            <!-- Duration -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-clock" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div class="ml-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{ t('pages.demo.meetingDetails.duration.title') }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('pages.demo.meetingDetails.duration.description') }}
                </p>
              </div>
            </div>

            <!-- Language -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-languages" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div class="ml-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{ t('pages.demo.meetingDetails.language.title') }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('pages.demo.meetingDetails.language.description') }}
                </p>
              </div>
            </div>

            <!-- Participants -->
            <div class="flex items-start">
              <div class="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <UIcon name="i-lucide-users" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div class="ml-4">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">
                  {{ t('pages.demo.meetingDetails.participants.title') }}
                </h3>
                <p class="text-gray-600 dark:text-gray-300">
                  {{ t('pages.demo.meetingDetails.participants.description') }}
                </p>
              </div>
            </div>
          </div>

          <!-- What to Prepare -->
          <div class="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
            <h3 class="font-semibold text-gray-900 dark:text-white mb-4">
              {{ t('pages.demo.meetingDetails.preparation.title') }}
            </h3>
            <ul class="space-y-2">
              <li v-for="item in preparationItems" :key="item" class="flex items-start">
                <UIcon name="i-lucide-check" class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span class="text-gray-600 dark:text-gray-300">{{ t(item) }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column - Demo Video Preview -->
        <div>
          <div id="demo-video" class="bg-gray-900 rounded-2xl overflow-hidden shadow-2xl">
            <!-- Video Placeholder -->
            <div class="relative aspect-video">
              <!-- <img
                src="/images/demo-preview.jpg"
                alt="Demo Preview"
                class="w-full h-full object-cover"
              /> -->
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button
                  class="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors group"
                  @click="playVideo"
                >
                  <UIcon name="i-lucide-play" class="w-8 h-8 text-gray-900 ml-1 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
          </div>

          <!-- Testimonial -->
          <div class="mt-6 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
            <p class="text-gray-700 dark:text-gray-300 italic mb-4">
              "{{ t('pages.demo.meetingDetails.testimonial.quote') }}"
            </p>
            <div class="flex items-center">
              <div class="w-10 h-10 bg-gray-300 rounded-full mr-3" />
              <div>
                <div class="font-semibold text-gray-900 dark:text-white">
                  {{ t('pages.demo.meetingDetails.testimonial.author') }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ t('pages.demo.meetingDetails.testimonial.role') }}
                </div>
              </div>
            </div>
          </div>

          <!-- FAQ Link -->
          <div class="mt-6 text-center">
            <p class="text-gray-600 dark:text-gray-300 mb-2">
              {{ t('pages.demo.meetingDetails.questions') }}
            </p>
            <UButton variant="link" to="/faq">
              {{ t('pages.demo.meetingDetails.viewFaq') }}
              <UIcon name="i-lucide-arrow-right" class="ml-1" />
            </UButton>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const preparationItems = [
  'pages.demo.meetingDetails.preparation.item1',
  'pages.demo.meetingDetails.preparation.item2',
  'pages.demo.meetingDetails.preparation.item3',
  'pages.demo.meetingDetails.preparation.item4'
]

const playVideo = () => {
  // Open video in modal or replace with video player
  console.log('Play demo video')
}
</script>
