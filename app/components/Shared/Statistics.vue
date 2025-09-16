<template>
  <SharedSection
    :variant="props.variant"
  >
    <div ref="root" class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
      <article v-for="(stat, index) in statistics" :key="index" class="text-center">
        <h2 class="text-5xl font-bold text-gray-900 dark:text-white mb-4">
          <span class="tabular-nums tracking-tight">
            {{ new Intl.NumberFormat().format(animatedStats[index] || 0) }}
          </span>{{ stat.suffix }}
        </h2>
        <p class="text-base text-gray-600 dark:text-gray-400">
          {{ stat.description }}
        </p>
      </article>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getAppearObserver } from '~/utils/appearObserver'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})

type Stat = { value: number; suffix: string; description: string }

const { t } = useI18n()

// Use Number() to ensure we get numeric values
const statistics = ref<Stat[]>([
  { value: Number(t('pages.home.statistics.stat1.value')), suffix: t('pages.home.statistics.stat1.suffix'), description: t('pages.home.statistics.stat1.description') },
  { value: Number(t('pages.home.statistics.stat2.value')), suffix: t('pages.home.statistics.stat2.suffix'), description: t('pages.home.statistics.stat2.description') },
  { value: Number(t('pages.home.statistics.stat3.value')), suffix: t('pages.home.statistics.stat3.suffix'), description: t('pages.home.statistics.stat3.description') }
])

// Initialize animated values to 0
const animatedStats = ref<number[]>([0, 0, 0])

const root = ref<HTMLElement | null>(null)
const hasAnimated = ref(false)
const once = true
const threshold = 0.25
const rootMargin = '0px'
const durationMs = 1600
const staggerMs = 150

const rafIds = new Map<number, number>()
const timeouts: number[] = []

function easeOutQuad(t: number): number {
  return 1 - (1 - t) * (1 - t)
}

function animateCounter(targetValue: number, index: number, duration: number): void {
  const start = performance.now()
  const from = 0

  const tick = (now: number) => {
    const p = Math.min((now - start) / duration, 1)
    const eased = easeOutQuad(p)
    animatedStats.value[index] = Math.round(from + (targetValue - from) * eased)
    if (p < 1) {
      const id = requestAnimationFrame(tick)
      rafIds.set(index, id)
    } else {
      rafIds.delete(index)
    }
  }

  const prev = rafIds.get(index)
  if (prev !== undefined) cancelAnimationFrame(prev)
  const id = requestAnimationFrame(tick)
  rafIds.set(index, id)
}

function startAllCounters(): void {
  if (hasAnimated.value) return
  hasAnimated.value = true

  // Reduced motion: jump straight to final values
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    statistics.value.forEach((s, i) => (animatedStats.value[i] = s.value))
    return
  }

  statistics.value.forEach((stat, i) => {
    const t = window.setTimeout(() => animateCounter(stat.value, i, durationMs), i * staggerMs)
    timeouts.push(t)
  })
}

onMounted(() => {
  if (!root.value || !import.meta.client) return

  const { observe, unobserve } = getAppearObserver(threshold, rootMargin)

  // Using IO is enough; it will fire immediately with current visibility state.
  observe(root.value, (entry) => {
    if (!entry.isIntersecting) return
    startAllCounters()
    if (once) unobserve(entry.target)
  })
})

onBeforeUnmount(() => {
  rafIds.forEach((id) => cancelAnimationFrame(id))
  rafIds.clear()
  for (const t of timeouts) clearTimeout(t)
})
</script>
