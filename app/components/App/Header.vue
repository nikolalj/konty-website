<template>
  <UHeader
    class="fixed top-0 w-full h-auto transition-[background-color,box-shadow,color] duration-1000 border-none"
    :class="!isHeaderSolid ? 'bg-transparent' : 'bg-white/90 dark:bg-gray-800/90'"
    :ui="{
      container: 'min-h-12'
    }"
    mode="slideover"
  >
    <template #top>
      <div
        class="overflow-hidden transition-[height,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-[height,opacity]"
        :class="isTopBarCollapsed ? 'h-0 opacity-0' : 'h-7 opacity-100'"
        :aria-hidden="isTopBarCollapsed ? 'true' : 'false'"
        :inert="isTopBarCollapsed"
      >
        <UContainer
          class="h-full flex items-center text-sm transition-colors duration-500"
        >
          <div class="flex w-full items-center justify-between font-semibold">
            <div class="flex items-center gap-4">
              <span>📧 contact@konty.com</span>
              <span>📞 +38267607670</span>
            </div>
          </div>
        </UContainer>
      </div>
    </template>

    <template #title>
      <div class="flex gap-2">
        <UColorModeImage
          light="/images/branding/logo-light.svg"
          dark="/images/branding/logo-dark.svg"
          alt="Konty logo"
          width="40"
          height="40"
        />
        <span class="text-2xl">konty</span>
      </div>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{
        link: 'text-base text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300',
        linkLeadingIcon: 'text-gray-900 dark:text-white'
      }"
    >
      <template #docs-content="{ item }">
        <ul class="grid gap-2 p-4 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
          <li class="row-span-3">
            <div class="size-full" />
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

    <template #body>
      <UNavigationMenu :items="items" orientation="vertical" class="-mx-2.5" />
    </template>

    <template #right>
      <UButton
        to="/demo"
        size="lg"
        variant="solid"
        color="primary"
        aria-label="Free Demo"
      >
        Free Demo
      </UButton>

      <UColorModeButton />
    </template>
  </UHeader>

</template>

<script setup lang="ts">
const { y } = useWindowScroll()

const ENTER_SOLID = 56
const EXIT_SOLID  = 8

const isHeaderSolid = ref(false)
const isTopBarCollapsed = ref(false)

watch(y, () => {
  const cur = y.value

  if (!isHeaderSolid.value && cur > ENTER_SOLID) isHeaderSolid.value = true
  else if (isHeaderSolid.value && cur < EXIT_SOLID) isHeaderSolid.value = false

  if (!isTopBarCollapsed.value && cur > ENTER_SOLID) isTopBarCollapsed.value = true
  else if (isTopBarCollapsed.value && cur < EXIT_SOLID) isTopBarCollapsed.value = false
}, { immediate: true })

const items = computed(() => [
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
])
</script>
