<template>
  <!-- Inline CSS variables ensure SSR gets the correct initial direction/values -->
  <component :is="as" ref="el" class="ui-appear" :style="inlineVars">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue'
import { getAppearObserver } from '@/utils/appearObserver'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const props = withDefaults(defineProps<{
  as?: string
  direction?: Direction
  distance?: number
  durationMs?: number
  delayMs?: number
  easing?: string
  threshold?: number
  rootMargin?: string
  once?: boolean
  stagger?: number
  staggerStepMs?: number
  animateOn?: unknown
}>(), {
  as: 'div',
  direction: 'up',
  distance: 24,
  durationMs: 700,
  delayMs: 0,
  easing: 'ease-out',
  threshold: 0.1,
  rootMargin: '0px',
  once: true,
  stagger: 0,
  staggerStepMs: 60,
  animateOn: undefined
})

const el = ref<HTMLElement | null>(null)
const delayTotalMs = computed(() => props.delayMs + props.stagger * props.staggerStepMs)

function dirToTransform(d: Direction, px: number): string {
  switch (d) {
    case 'up':    return `translate3d(0, ${px}px, 0)`     // from below → up
    case 'down':  return `translate3d(0, -${px}px, 0)`    // from above → down
    case 'left':  return `translate3d(-${px}px, 0, 0)`    // from left  → right
    case 'right': return `translate3d(${px}px, 0, 0)`     // from right → left
    default:      return 'none'
  }
}

/** SSR-friendly variables bound on the node at render time */
const inlineVars = computed(() => ({
  '--appear-duration': `${props.durationMs}ms`,
  '--appear-delay': `${delayTotalMs.value}ms`,
  '--appear-ease': props.easing,
  '--appear-transform': dirToTransform(props.direction, props.distance)
} as Record<string, string>))

let observed = false
let ioPool: ReturnType<typeof getAppearObserver> | null = null
let handler: ((e: IntersectionObserverEntry) => void) | null = null
let clearWillChangeTimer: number | null = null

function show(node: HTMLElement): void {
  node.classList.add('is-visible')
  if (clearWillChangeTimer !== null) window.clearTimeout(clearWillChangeTimer)
  clearWillChangeTimer = window.setTimeout(() => { node.style.willChange = '' }, props.durationMs + delayTotalMs.value + 50)
}

function hide(node: HTMLElement): void {
  node.style.willChange = 'transform, opacity'
  node.classList.remove('is-visible')
}

function observe(node: HTMLElement): void {
  if (!ioPool) ioPool = getAppearObserver(props.threshold, props.rootMargin)
  if (!handler) {
    handler = (entry) => {
      const target = entry.target as HTMLElement
      if (entry.isIntersecting) {
        show(target)
        if (props.once) unobserve(target)
      } else if (!props.once) {
        hide(target)
        void target.offsetHeight // flush for reliable repeats
      }
    }
  }
  if (!observed) {
    ioPool.observe(node, handler)
    observed = true
  }
}

function unobserve(node: HTMLElement): void {
  if (observed && ioPool) {
    ioPool.unobserve(node)
    observed = false
  }
}

async function restart(): Promise<void> {
  const node = el.value
  if (!node) return

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    node.style.transition = 'none'
    node.classList.add('is-visible')
    node.style.willChange = ''
    return
  }

  // snap-hide without transition, then show next frame (vars already bound)
  const prevTransition = node.style.transition
  node.style.transition = 'none'
  hide(node)
  void node.offsetHeight
  node.style.transition = prevTransition
  requestAnimationFrame(() => requestAnimationFrame(() => show(node)))
}

onMounted(() => {
  const node = el.value
  if (!node) return

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    node.classList.add('is-visible')
    node.style.transition = 'none'
    node.style.willChange = ''
    return
  }

  // Hidden by default via .ui-appear; IO toggles to visible
  observe(node)
})

onBeforeUnmount(() => {
  const node = el.value
  if (node) unobserve(node)
  if (clearWillChangeTimer !== null) window.clearTimeout(clearWillChangeTimer)
})

watch(() => props.animateOn, () => { void restart() }, { flush: 'post' })
defineExpose({ restart })
</script>
