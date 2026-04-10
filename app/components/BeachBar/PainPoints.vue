<template>
  <section class="bg-white py-16 lg:py-24">
    <UContainer>
      <UIAppear>
        <div class="mx-auto max-w-2xl text-center">
          <h2 class="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
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
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-lg" :class="item.iconBgClass">
              <Icon :name="item.icon" class="h-6 w-6" :class="item.iconClass" />
            </div>
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
    icon: 'i-lucide-clipboard-list',
    classes: 'border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100',
    titleClass: 'text-amber-900',
    textClass: 'text-amber-800',
    iconBgClass: 'bg-amber-200',
    iconClass: 'text-amber-700'
  },
  {
    key: 'theft',
    icon: 'i-lucide-banknote',
    classes: 'border-red-200 bg-gradient-to-br from-red-50 to-red-100',
    titleClass: 'text-red-900',
    textClass: 'text-red-800',
    iconBgClass: 'bg-red-200',
    iconClass: 'text-red-700'
  },
  {
    key: 'online',
    icon: 'i-lucide-globe',
    classes: 'border-indigo-200 bg-gradient-to-br from-indigo-50 to-indigo-100',
    titleClass: 'text-indigo-900',
    textClass: 'text-indigo-800',
    iconBgClass: 'bg-indigo-200',
    iconClass: 'text-indigo-700'
  },
  {
    key: 'understaffed',
    icon: 'i-lucide-users',
    classes: 'border-green-200 bg-gradient-to-br from-green-50 to-green-100',
    titleClass: 'text-green-900',
    textClass: 'text-green-800',
    iconBgClass: 'bg-green-200',
    iconClass: 'text-green-700'
  }
]
</script>
