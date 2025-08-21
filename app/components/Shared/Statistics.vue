<template>
  <UPageSection :ui="{ container: '!py-0', root: 'py-12 sm:py-16' }">
    <UContainer>
      <section ref="root" class="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-4xl mx-auto">
        <div v-for="(stat, index) in statistics" :key="index" class="text-center">
          <div class="mb-4">
            <h2 class="text-5xl font-bold text-gray-900 dark:text-white">
              <span class="tabular-nums tracking-tight">
                {{ new Intl.NumberFormat().format(animatedStats[index] || 0) }}
              </span>{{ stat.suffix }}
            </h2>
          </div>
          <div class="text-gray-600 dark:text-gray-400">
            <p class="text-base">{{ stat.description }}</p>
          </div>
        </div>
      </section>
    </UContainer>
  </UPageSection>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { getAppearObserver } from '~/utils/appearObserver'

type Stat = { value: number; suffix: string; description: string }

const { t, locale } = useI18n()

// Get numeric value from translations
const getStatValue = (key: string): number => {
  const { messages } = useI18n()
  const localeData = locale.value
  const localeMessages = messages.value[localeData] || messages.value['me']
  // Type assertion to access nested properties
  type LocaleMessagesWithStats = Record<string, unknown> & {
    statistics?: Record<string, { value?: number }>
  }
  const stats = (localeMessages as LocaleMessagesWithStats)?.statistics
  return stats?.[key]?.value || 0
}

const statistics = ref<Stat[]>([
  { value: getStatValue('stat1'), suffix: t('statistics.stat1.suffix'), description: t('statistics.stat1.description') },
  { value: getStatValue('stat2'), suffix: t('statistics.stat2.suffix'), description: t('statistics.stat2.description') },
  { value: getStatValue('stat3'), suffix: t('statistics.stat3.suffix'), description: t('statistics.stat3.description') }
])

const animatedStats = ref<number[]>(statistics.value.map(() => 0))

const root = ref<HTMLElement | null>(null)
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
