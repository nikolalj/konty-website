<template>
  <section
    class="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900"
  >
    <!-- Wave Background Pattern -->
    <div
      class="absolute inset-0 overflow-hidden pointer-events-none opacity-40 dark:opacity-30"
    >
      <svg
        class="absolute top-0 left-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <path
          fill="currentColor"
          class="text-primary-400 dark:text-primary-800"
          d="M0,192L48,208C96,224,192,256,288,250.7C384,245,480,203,576,192C672,181,768,203,864,224C960,245,1056,267,1152,250.7C1248,235,1344,181,1392,154.7L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
        <path
          fill="currentColor"
          class="text-primary-300 dark:text-primary-700"
          d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
      </svg>
    </div>

    <UContainer class="relative z-10 pt-34 lg:pt-40 pb-16">
      <div class="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
        <!-- Content -->
        <div>
          <UIAppear>
            <h1
              class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl"
            >
              {{ t('pages.contact.hero.title') }}
            </h1>
          </UIAppear>

          <UIAppear direction="up" :delay="100">
            <p class="mt-6 text-lg text-gray-600 dark:text-gray-300">
              {{ t('pages.contact.hero.subtitle') }}
            </p>
          </UIAppear>
        </div>

        <!-- Contact Cards Grid -->
        <UIAppear direction="right" :delay="200">
          <div class="mt-10 lg:mt-0 grid grid-cols-2 gap-4">
            <!-- Address Card -->
            <div
              class="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-primary-900/40 backdrop-blur-sm border-2 border-primary-200/50 dark:border-primary-800/50 p-6 hover:shadow-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex flex-col items-center text-center h-full">
                <div
                  class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  <UIcon name="i-lucide-map-pin" class="w-7 h-7 text-white" />
                </div>
                <h3
                  class="font-bold text-base text-gray-900 dark:text-white mb-2"
                >
                  {{ t('pages.contact.address.title') }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('pages.contact.address.line1') }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('pages.contact.address.line2') }}
                </p>
              </div>
            </div>

            <!-- Phone Card -->
            <div
              class="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-primary-900/40 backdrop-blur-sm border-2 border-primary-200/50 dark:border-primary-800/50 p-6 hover:shadow-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex flex-col items-center text-center h-full">
                <div
                  class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  <UIcon name="i-lucide-phone" class="w-7 h-7 text-white" />
                </div>
                <h3
                  class="font-bold text-base text-gray-900 dark:text-white mb-2"
                >
                  {{ t('pages.contact.phone.title') }}
                </h3>
                <a
                  :href="`tel:${t('pages.contact.phone.number').replace(/\s/g, '')}`"
                  class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors"
                >
                  {{ t('pages.contact.phone.number') }}
                </a>
              </div>
            </div>

            <!-- Email Card -->
            <div
              class="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-primary-900/40 backdrop-blur-sm border-2 border-primary-200/50 dark:border-primary-800/50 p-6 hover:shadow-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex flex-col items-center text-center h-full">
                <div
                  class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  <UIcon name="i-lucide-mail" class="w-7 h-7 text-white" />
                </div>
                <h3
                  class="font-bold text-base text-gray-900 dark:text-white mb-2"
                >
                  {{ t('pages.contact.email.title') }}
                </h3>
                <a
                  :href="`mailto:${t('pages.contact.email.address')}@konty.com`"
                  class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors break-all"
                >
                  {{ t('pages.contact.email.address') }}@konty.com
                </a>
              </div>
            </div>

            <!-- Working Hours Card -->
            <div
              class="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-primary-900/40 backdrop-blur-sm border-2 border-primary-200/50 dark:border-primary-800/50 p-6 hover:shadow-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:-translate-y-1"
            >
              <div class="flex flex-col items-center text-center h-full">
                <div
                  class="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 dark:from-primary-600 dark:to-primary-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                >
                  <UIcon name="i-lucide-clock" class="w-7 h-7 text-white" />
                </div>
                <h3
                  class="font-bold text-base text-gray-900 dark:text-white mb-2"
                >
                  {{ t('pages.contact.hours.title') }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('pages.contact.hours.weekdays') }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('pages.contact.hours.weekend') }}
                </p>
              </div>
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>

    <!-- Bottom Wave Shape -->
    <div
      class="absolute left-0 right-0 -bottom-px w-full leading-[0] pointer-events-none"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 170"
        aria-hidden="true"
        fill="#201533"
      >
        <path
          fill-opacity="1"
          d="M0,160L120,160C240,160,480,160,720,138.7C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
