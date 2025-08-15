<template>
  <header
    class="fixed top-0 z-50 w-full transition-[background-color,box-shadow,color] duration-1000"
    :class="isHeaderSolid
      ? (isDark ? `${bgClass.dark} ${textClass.light} backdrop-blur`: `${bgClass.light} ${textClass.dark} backdrop-blur shadow-sm`)
      : (isDark ? `bg-transparent ${textClass.light}` : `bg-transparent ${textClass.dark} `)"
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
        :class="isDark ? textClass.light : textClass.dark"
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
          class="text-3xl font-bold transition-[color,font-weight] duration-700"
          :class="isDark ? textClass.light : textClass.dark"
        >
          <div class="flex gap-2">
            <NuxtImg
              :src="isDark ? '/images/branding/logo-dark.svg' : '/images/branding/logo-light.svg'"
              alt="Konty logo"
              width="46"
              height="46"
            />
            konty
          </div>
        </NuxtLink>

        <!-- desktop nav -->
        <!-- <nav class="hidden md:flex items-center gap-8">
          <NuxtLink
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="font-medium transition-colors"
            :class="isDark ? `${textClass.light}/90 hover:${textClass.light}` : `${textClass.dark} hover:text-primary`"
          >
            {{ link.label }}
          </NuxtLink>
        </nav> -->

        <UNavigationMenu
          :items="items"
          :ui="{
            viewport: 'sm:w-(--reka-navigation-menu-viewport-width)',
            content: 'sm:w-auto',
            childList: 'sm:w-96',
            childLinkDescription: 'text-balance line-clamp-2',
          }"
          class="justify-center"
        >
          <template #docs-content="{ item }">
            <ul class="grid gap-2 p-4 lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
              <li class="row-span-3">
                <div class="size-full min-h-48" />
              </li>

              <li v-for="child in item.children" :key="child.label">
                <ULink class="text-sm text-left rounded-md p-3 transition-colors hover:bg-elevated/50">
                  <p class="font-medium text-highlighted">
                    {{ child.label }}
                  </p>
                  <p class="text-muted line-clamp-2">
                    {{ child.description }}
                  </p>
                </ULink>
              </li>
            </ul>
          </template>
        </UNavigationMenu>

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
      <UColorModeButton :class="isDark ? textClass.light : textClass.dark" />
    </div>
  </header>
</template>

<script setup lang="ts">
import { useThrottleFn } from '@vueuse/core'

// Scroll state
const { y } = useWindowScroll()
const route = useRoute()
const colorMode = useColorMode()

const textClass = { dark: 'text-gray-900', light: 'text-white' }
const bgClass = { dark: 'bg-gray-900/95', light: 'bg-white' }

const forceDarkHeaderRoutes = new Set<string>(['/', '/konty-retail', '/konty-hospitality'])
const forceLightHeaderRoutes = new Set<string>(['/about'])

const isDark = computed(() => {
  if (isHeaderSolid.value) return colorMode.value === 'dark'
  if (forceDarkHeaderRoutes.has(route.path)) return true
  if (forceLightHeaderRoutes.has(route.path)) return false
  return colorMode.value === 'dark'
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

const items = [
  {
    label: 'Products',
    class: 'font-bold',
    slot: 'docs' as const,
    children: [
      {
        label: 'Icons',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.'
      },
      {
        label: 'Colors',
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.'
      },
      {
        label: 'Theme',
        description: 'You can customize components by using the `class` / `ui` props or in your app.config.ts.'
      }
    ]
  },
  {
    label: 'Restaurants',
    class: 'font-bold',
    slot: 'components' as const,
    to: '/konty-hospitality',
    children: [
      {
        label: 'Link',
        description: 'Use NuxtLink with superpowers.'
      },
      {
        label: 'Modal',
        description: 'Display a modal within your application.'
      },
      {
        label: 'NavigationMenu',
        description: 'Display a list of links.'
      },
      {
        label: 'Pagination',
        description: 'Display a list of pages.'
      },
      {
        label: 'Popover',
        description: 'Display a non-modal dialog that floats around a trigger element.'
      },
      {
        label: 'Progress',
        description: 'Show a horizontal bar to indicate task progression.'
      }
    ]
  },
    {
    label: 'Retail',
    class: 'font-bold',
    to: '/konty-retail',
    slot: 'components' as const,
    children: [
      {
        label: 'Link',
        description: 'Use NuxtLink with superpowers.'
      },
      {
        label: 'Modal',
        description: 'Display a modal within your application.'
      },
      {
        label: 'NavigationMenu',
        description: 'Display a list of links.'
      },
      {
        label: 'Pagination',
        description: 'Display a list of pages.'
      },
      {
        label: 'Popover',
        description: 'Display a non-modal dialog that floats around a trigger element.'
      },
      {
        label: 'Progress',
        description: 'Show a horizontal bar to indicate task progression.'
      }
    ]
  },
  {
    label: 'Pricing',
    class: 'font-bold',
    to: '/pricing'
  },
  {
    label: 'About',
    class: 'font-bold',
    to: '/about'
  }
]
</script>
