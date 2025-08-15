<template>
  <header
    class="fixed top-0 z-50 w-full transition-[background-color,box-shadow,color] duration-1000"
    :class="isHeaderSolid
      ? (isDark ? 'bg-gray-900/95 text-white backdrop-blur' : 'bg-white text-gray-900 backdrop-blur shadow-sm')
      : (topTextLight ? 'bg-transparent text-white' : 'bg-transparent text-gray-900')"
  >
    <!-- Top bar: visible at top, collapses on scroll -->
    <div
      class="overflow-hidden transition-[height,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-[height,opacity]"
      :class="isTopBarCollapsed ? 'h-0 opacity-0' : 'h-10 opacity-100'"
      :aria-hidden="isTopBarCollapsed ? 'true' : 'false'"
      :inert="isTopBarCollapsed"
    >
      <UContainer
        class="h-full flex items-center text-sm transition-colors duration-500"
        :class="isHeaderSolid
          ? (isDark ? 'text-white' : 'text-gray-700')
          : (topTextLight ? 'text-white' : 'text-gray-900')"
      >
        <div class="flex w-full items-center justify-between">
          <div class="flex items-center gap-4">
            <span>📧 contact@konty.com</span>
            <span>📞 +1-555-KONTY</span>
          </div>
        </div>
      </UContainer>
    </div>

    <!-- Main header -->
    <UContainer class="h-[70px] flex items-center">
      <div class="flex w-full items-center justify-between">
        <NuxtLink
          to="/"
          class="text-2xl font-bold transition-[color,font-weight] duration-700"
          :class="isHeaderSolid
            ? (isDark ? 'text-white font-semibold' : 'text-primary font-semibold')
            : (topTextLight ? 'text-white font-medium' : 'text-primary font-medium')"
        >
          Konty
        </NuxtLink>

        <!-- desktop nav -->
        <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="font-medium transition-colors"
            :class="isHeaderSolid
              ? (isDark ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-primary')
              : (topTextLight ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-primary')"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <UButton
          to="/demo"
          size="lg"
          variant="solid"
          color="primary"
        >
          Free Demo
        </UButton>
      </div>
    </UContainer>

    <div
      class="transition-[padding] absolute right-3 top-0 h-full flex items-center"
      :class="!isTopBarCollapsed ? 'pt-10' : ''"
    >
      <UColorModeButton />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'

// Scroll state
const { y } = useWindowScroll()

const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

// Optional per-route overrides for top-of-page contrast
const route = useRoute()
const forceDarkHeaderRoutes = new Set<string>(['/', '/konty-retail', '/konty-hospitality'])
const forceLightHeaderRoutes = new Set<string>([])

const forceTheme = computed<'dark' | 'light' | undefined>(() => {
  if (forceDarkHeaderRoutes.has(route.path)) return 'dark'
  if (forceLightHeaderRoutes.has(route.path)) return 'light'
  return undefined
})

// Top-of-page text color on transparent bg
// - force 'dark' => light text
// - force 'light' => dark text
// - else follow site theme
const topTextLight = computed(() => {
  if (forceTheme.value === 'dark') return true
  if (forceTheme.value === 'light') return false
  return isDark.value
})

// Hysteresis thresholds
const ENTER_SOLID = 56
const EXIT_SOLID  = 8

const isHeaderSolid = ref(false)
const isTopBarCollapsed = ref(false)

const update = () => {
  const cur = y.value

  // Header solid/transparent
  if (!isHeaderSolid.value && cur > ENTER_SOLID) isHeaderSolid.value = true
  else if (isHeaderSolid.value && cur < EXIT_SOLID) isHeaderSolid.value = false

  // Top bar show/hide
  if (!isTopBarCollapsed.value && cur > ENTER_SOLID) isTopBarCollapsed.value = true
  else if (isTopBarCollapsed.value && cur < EXIT_SOLID) isTopBarCollapsed.value = false
}

// Smooth, stable updates
watch(y, useThrottleFn(update, 16), { immediate: true })

// Nav links
const links = [
  { to: '/products', label: 'Products' },
  { to: '/konty-hospitality', label: 'Restaurants' },
  { to: '/konty-retail', label: 'Retail' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' }
] as const
</script>
