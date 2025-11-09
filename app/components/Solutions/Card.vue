<template>
  <UIAppear :direction="direction" :distance="20">
    <NuxtLink
      :to="solution.href"
      class="group relative block rounded-2xl border border-white/20 bg-white/10 backdrop-blur-sm p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1 hover:bg-white/15 hover:border-white/30"
    >
      <!-- Icon -->
      <div class="mb-4 text-4xl">
        {{ solution.icon }}
      </div>

      <!-- Title -->
      <h3 class="mb-2 text-lg font-semibold text-white group-hover:text-white">
        {{ solution.title }}
      </h3>

      <!-- Description -->
      <p class="text-sm text-white/80">
        {{ solution.description }}
      </p>

      <!-- CTA -->
      <div class="mt-4 flex items-center text-sm font-medium text-white">
        <span>{{ t('pages.solutions.cta.learnMore') }}</span>
        <UIcon name="i-lucide-arrow-right" class="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </NuxtLink>
  </UIAppear>
</template>

<script setup lang="ts">
interface Solution {
  id: string
  title: string
  description: string
  icon: string
  href: string
  category: string
}

defineProps<{
  solution: Solution
  direction?: 'up' | 'down' | 'left' | 'right'
}>()

const { t } = useI18n()
</script>