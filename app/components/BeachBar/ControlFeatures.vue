<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ t('pages.solutions.beachBar.control.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.control.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <div class="mt-12 grid gap-6 sm:grid-cols-3">
        <UIAppear v-for="(item, index) in controlItems" :key="item.key" :delay-ms="index * 100">
          <div class="rounded-2xl border border-gray-200 p-6 text-center">
            <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl" :class="item.bgClass">
              {{ item.icon }}
            </div>
            <h3 class="text-base font-bold text-gray-900">
              {{ t(`pages.solutions.beachBar.control.features.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-gray-500">
              {{ t(`pages.solutions.beachBar.control.features.${item.key}.description`) }}
            </p>
          </div>
        </UIAppear>
      </div>

      <!-- Industry data callout -->
      <UIAppear :delay-ms="300">
        <div class="mt-10 rounded-2xl border border-amber-200 bg-gradient-to-br from-[#fdf8f0] to-amber-100 p-8 text-center">
          <p class="text-lg font-semibold leading-relaxed text-amber-900">
            "{{ t('pages.solutions.beachBar.control.callout.quote') }}"
          </p>
          <p class="mt-3 text-sm text-amber-700">
            {{ t('pages.solutions.beachBar.control.callout.attribution') }}
          </p>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const controlItems = [
  { key: 'name', icon: '👤', bgClass: 'bg-green-50' },
  { key: 'receipt', icon: '🧾', bgClass: 'bg-blue-50' },
  { key: 'report', icon: '📊', bgClass: 'bg-amber-50' }
]
</script>
