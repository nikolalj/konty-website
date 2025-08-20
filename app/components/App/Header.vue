<template>
  <UHeader
    class="fixed top-0 w-full h-auto transition-[background-color,box-shadow,color] duration-1000 border-none"
    :class="!isHeaderSolid ? 'bg-transparent' : 'bg-[var(--ui-bg)]/90'"
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
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-1">
              <Icon name="i-lucide-mail" /> contact@konty.com
            </div>
            <div class="flex items-center gap-1">
              <Icon name="i-lucide-phone" /> +38267607670
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
      <template #products-content="{ item }">
        <ul class="grid gap-2 p-4 lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]">
          <li class="row-span-2">
            <UILazyImage
              src="https://images.unsplash.com/photo-1516554646385-7642248096d1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FpdGVyJTIwc2VydmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              preset="hero"
              :sizes="'100vw'"
              loading="eager"
              fetchpriority="high"
              alt=""
              role="presentation"
              class="h-full"
            />
          </li>

          <li v-for="child in item.children" :key="child.label">
            <ULink :to="child.to || '#'" class="inline-block text-sm text-left rounded-md p-3 transition-colors hover:bg-elevated/50">
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

      <template #hospitality-content="{ item }">
        <div class="grid grid-cols-3 gap-4 p-4">
          <div class="col-span-1">
            <UILazyImage
              src="https://images.unsplash.com/photo-1516554646385-7642248096d1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FpdGVyJTIwc2VydmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              preset="hero"
              :sizes="'100vw'"
              loading="eager"
              fetchpriority="high"
              alt=""
              role="presentation"
              class="h-full w-full object-cover rounded-md"
            />
          </div>

          <ul class="col-span-1 space-y-1">
            <li v-for="child in item.children.slice(0, Math.ceil(item.children.length / 2))" :key="child.label">
              <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
                <p class="font-medium text-highlighted">
                  {{ child.label }}
                </p>
              </ULink>
            </li>
          </ul>

          <ul class="col-span-1 space-y-1">
            <li v-for="child in item.children.slice(Math.ceil(item.children.length / 2))" :key="child.label">
              <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
                <p class="font-medium text-highlighted">
                  {{ child.label }}
                </p>
              </ULink>
            </li>
          </ul>
        </div>
      </template>

      <template #retail-content="{ item }">
        <div class="grid grid-cols-2 gap-4 p-4">
          <div class="col-span-1">
            <UILazyImage
              src="https://images.unsplash.com/photo-1516554646385-7642248096d1?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FpdGVyJTIwc2VydmluZ3xlbnwwfHwwfHx8MA%3D%3D"
              preset="hero"
              :sizes="'100vw'"
              loading="eager"
              fetchpriority="high"
              alt=""
              role="presentation"
              class="h-full w-full object-cover rounded-md"
            />
          </div>

          <ul class="col-span-1 space-y-1">
            <li v-for="child in item.children" :key="child.label">
              <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
                <p class="font-medium text-highlighted">
                  {{ child.label }}
                </p>
              </ULink>
            </li>
          </ul>
        </div>
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
        aria-label="Besplatan demo"
      >
        Besplatan demo
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
    slot: 'products' as const,
    children: [
      {
        label: 'Konty for Restaurants',
        description: 'You have nothing to do, @nuxt/icon will handle it automatically.',
        to: '/about'
      },
      {
        label: 'Konty for Retail',
        description: 'Choose a primary and a neutral color from your Tailwind CSS theme.',
        to: '/about'
      }
    ]
  },
  {
    label: 'Restaurants',
    class: 'font-bold',
    slot: 'hospitality' as const,
    to: '/konty-hospitality',
    children: [
      { label: 'Bar & Lounge', to: '/about' },
      { label: 'Casual Dining', to: '/about' },
      { label: 'Cafe & Bakery', to: '/about' },
      { label: 'Fine Dining', to: '/about' },
      { label: 'Enterprise', to: '/about' },
      { label: 'Food Truck', to: '/about' },
      { label: 'Pizza', to: '/about' },
      { label: 'Hotel Restaurant', to: '/about' },
      { label: 'Catering & Events', to: '/about' },
    ]
  },
  {
    label: 'Retail',
    class: 'font-bold',
    to: '/konty-retail',
    slot: 'retail' as const,
    children: [
      { label: 'Convenience', to: '/about' },
      { label: 'Bottle Shop', to: '/about' },
      { label: 'Grocery', to: '/about' },
      { label: 'Butcher Shop', to: '/about' },
      { label: 'Restaurant/Retail Hybrid', to: '/about' },
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
