<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            {{ t('pages.solutions.beachBar.painPoints.title') }}
          </h2>
          <p class="mt-4 text-lg text-gray-500">
            {{ t('pages.solutions.beachBar.painPoints.subtitle') }}
          </p>
        </div>
      </UIAppear>

      <div class="mt-12 grid gap-5 sm:grid-cols-2">
        <UIAppear v-for="(item, index) in painItems" :key="item.key" :delay-ms="index * 100">
          <div
            class="rounded-2xl border p-7"
            :class="item.classes"
          >
            <span class="text-3xl">{{ item.icon }}</span>
            <h3 class="mt-3 text-lg font-bold" :class="item.titleClass">
              {{ t(`pages.solutions.beachBar.painPoints.items.${item.key}.title`) }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed" :class="item.textClass">
              {{ t(`pages.solutions.beachBar.painPoints.items.${item.key}.description`) }}
            </p>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()

const painItems = [
  {
    key: 'paper',
    icon: '\u{1F4CB}',
    classes: 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
    titleClass: 'text-amber-900',
    textClass: 'text-amber-800'
  },
  {
    key: 'theft',
    icon: '\u{1F4B8}',
    classes: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100',
    titleClass: 'text-red-900',
    textClass: 'text-red-800'
  },
  {
    key: 'online',
    icon: '\u{1F310}',
    classes: 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100',
    titleClass: 'text-indigo-900',
    textClass: 'text-indigo-800'
  },
  {
    key: 'understaffed',
    icon: '\u{1F3C3}',
    classes: 'border-green-200 bg-gradient-to-br from-green-50 to-green-100',
    titleClass: 'text-green-900',
    textClass: 'text-green-800'
  }
]
</script>
