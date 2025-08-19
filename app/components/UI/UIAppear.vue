<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getAppearObserver } from '@/utils/appearObserver'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const props = withDefaults(defineProps<{
  direction?: Direction
  distance?: number
  threshold?: number
  once?: boolean
  durationMs?: number
  delayMs?: number
  easing?: string
  as?: string
  /** How far outside/inside viewport to trigger, e.g. "0px 0px -10% 0px" */
  rootMargin?: string
  /** Item order for staggering (0-based) */
  stagger?: number
  /** Per-step stagger increment in ms */
  staggerStepMs?: number
}>(), {
  direction: 'up',
  distance: 24,
  threshold: 0.1,
  once: true,
  durationMs: 700,
  delayMs: 0,
  easing: 'ease-out',
  as: 'div',
  rootMargin: '0px',
  stagger: 0,
  staggerStepMs: 60
})

const el = ref<HTMLElement | null>(null)
let unobserve: (() => void) | null = null
let clearWillChangeTimer: number | null = null

function initialTransform(dir: Direction, dist: number): string {
  switch (dir) {
    case 'up': return `translateY(${dist}px)`
    case 'down': return `translateY(-${dist}px)`
    case 'left': return `translateX(${dist}px)`
    case 'right': return `translateX(-${dist}px)`
    default: return 'none'
  }
}

const computedDelay = computed(() => props.delayMs + props.stagger * props.staggerStepMs)

const baseStyle = computed(() => ({
  opacity: '0',
  transform: initialTransform(props.direction, props.distance),
  transitionProperty: 'opacity, transform',
  transitionDuration: `${props.durationMs}ms`,
  transitionTimingFunction: props.easing,
  transitionDelay: `${computedDelay.value}ms`,
  willChange: 'transform, opacity'
} as const))

function show() {
  if (!el.value) return
  el.value.style.opacity = '1'
  el.value.style.transform = 'none'
  // Drop will-change after animation to free memory
  if (clearWillChangeTimer !== null) window.clearTimeout(clearWillChangeTimer)
  clearWillChangeTimer = window.setTimeout(() => {
    if (el.value) el.value.style.willChange = ''
  }, props.durationMs + computedDelay.value + 50)
}

function hide() {
  if (!el.value) return
  el.value.style.willChange = 'transform, opacity'
  el.value.style.opacity = '0'
  el.value.style.transform = initialTransform(props.direction, props.distance)
}

function isInViewport(target: HTMLElement, threshold: number): boolean {
  const rect = target.getBoundingClientRect()
  const vw = window.innerWidth || document.documentElement.clientWidth
  const vh = window.innerHeight || document.documentElement.clientHeight
  const ix = Math.max(0, Math.min(rect.right, vw) - Math.max(rect.left, 0))
  const iy = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0))
  const visibleArea = ix * iy
  const elArea = Math.max(1, rect.width * rect.height)
  return visibleArea / elArea >= threshold
}

function nextFrame(): Promise<void> {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)))
}

onMounted(async () => {
  if (!el.value) return

  // Respect reduced motion: reveal immediately without transition
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.value.style.transition = 'none'
    el.value.style.opacity = '1'
    el.value.style.transform = 'none'
    el.value.style.willChange = ''
    return
  }

  // Ensure hidden state takes effect before toggling
  hide()
  void window.getComputedStyle(el.value).opacity

  // If already visible on load, animate right away
  if (isInViewport(el.value, props.threshold)) {
    await nextFrame()
    show()
    if (props.once) return
  }

  // Shared IO pool
  const pool = getAppearObserver(props.threshold, props.rootMargin)
  const handler = (entry: IntersectionObserverEntry) => {
    if (entry.isIntersecting) {
      show()
      if (props.once && el.value) {
        pool.unobserve(el.value)
        unobserve = null
      }
    } else if (!props.once) {
      hide()
      // Flush so repeat animations run reliably
      if (el.value) void window.getComputedStyle(el.value).opacity
    }
  }

  pool.observe(el.value, handler)
  unobserve = () => pool.unobserve(el.value as Element)
})

onBeforeUnmount(() => {
  if (unobserve) unobserve()
  if (clearWillChangeTimer !== null) window.clearTimeout(clearWillChangeTimer)
})
</script>

<template>
  <!-- Polymorphic wrapper; forwards any attrs/classes to root -->
  <component :is="as" ref="el" :style="baseStyle">
    <slot />
  </component>
</template>
