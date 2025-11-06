<template>
  <section
    class="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900"
  >
    <!-- Wave Background Pattern -->
    <UIWaveBackground />

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
                  {{ t('ui.common.labels.address') }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('data.company.address.street') }}
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('data.company.address.postalCode') }}
                  {{ t('data.company.address.city') }}
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
                  {{ t('ui.common.labels.phone') }}
                </h3>
                <a
                  :href="`tel:${t('data.company.contact.phone')}`"
                  class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors"
                >
                  {{ t('data.company.contact.phone') }}
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
                  {{ t('ui.common.labels.email') }}
                </h3>
                <a
                  :href="`mailto:${t('data.company.contact.email')}@konty.com`"
                  class="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium hover:underline transition-colors break-all"
                >
                  {{ t('data.company.contact.email') }}@konty.com
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
                  {{ t('ui.common.labels.businessHours') }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300">
                  {{ t('ui.common.labels.weekdays') }}:
                  {{ t('data.company.businessHours.weekdays.opens') }} -
                  {{ t('data.company.businessHours.weekdays.closes') }}
                </p>
              </div>
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>

    <!-- Bottom Wave Shape -->
    <UIWaveBottomShape fill="#201533" fill-class="" />
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
