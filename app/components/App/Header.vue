<template>
  <UHeader
    class="fixed top-0 w-full h-auto transition-[background-color,box-shadow,color] duration-1000 border-none"
    :class="!isHeaderSolid ? 'bg-transparent' : 'bg-[var(--ui-bg)]/90'"
    :ui="{
      container: 'min-h-16'
    }"
    mode="slideover"
  >
    <template #top>
      <div
        class="overflow-hidden transition-[height,opacity] duration-700 ease-[cubic-bezier(.22,1,.36,1)] will-change-[height,opacity]"
        :class="isTopBarCollapsed ? 'h-0 opacity-0' : 'h-10 opacity-100'"
        :aria-hidden="isTopBarCollapsed ? 'true' : 'false'"
        :inert="isTopBarCollapsed"
      >
        <AppLocaleSuggestionBanner />

        <UContainer
          class="h-full flex items-center justify-between text-sm transition-colors duration-500"
        >
          <!-- Breadcrumbs on left (only on inner pages) -->
          <div>
            <AppBreadcrumbs v-if="!isHomepage" />
          </div>

          <!-- Contact info on right (or centered on homepage) -->
          <div class="flex items-center gap-4">
            <div class="hidden sm:flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Icon name="i-lucide-mail" class="w-4 h-4" />
              <span class="hidden md:inline">contact@konty.com</span>
            </div>
            <div class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Icon name="i-lucide-phone" class="w-4 h-4" />
              <span>+38267607670</span>
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
              src="/images/navigation/products.jpeg"
              preset="navigation"
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
              src="/images/navigation/products.jpeg"
              preset="navigation"
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
              src="/images/navigation/products.jpeg"
              preset="navigation"
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
        :to="localePath('/demo')"
        size="lg"
        variant="solid"
        color="primary"
        :aria-label="$t('hero.cta')"
      >
        {{ $t('hero.cta') }}
      </UButton>

      <AppCountrySelector class="ml-2" />

      <UColorModeButton />
    </template>
  </UHeader>

</template>

<script setup lang="ts">
const { y } = useWindowScroll()
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const ENTER_SOLID = 56
const EXIT_SOLID  = 8

const isHeaderSolid = ref(false)
const isTopBarCollapsed = ref(false)

// Check if we're on homepage
const isHomepage = computed(() => {
  const path = route.path
  return path === '/' || path === '/me' || path === '/ba' || path === '/us' || path === '/rs'
})

watch(y, () => {
  const cur = y.value

  if (!isHeaderSolid.value && cur > ENTER_SOLID) isHeaderSolid.value = true
  else if (isHeaderSolid.value && cur < EXIT_SOLID) isHeaderSolid.value = false

  if (!isTopBarCollapsed.value && cur > ENTER_SOLID) isTopBarCollapsed.value = true
  else if (isTopBarCollapsed.value && cur < EXIT_SOLID) isTopBarCollapsed.value = false
}, { immediate: true })

const items = computed(() => [
  {
    label: t('nav.products'),
    class: 'font-bold',
    slot: 'products' as const,
    children: [
      {
        label: t('nav.forHospitality'),
        description: t('nav.hospitalityDesc'),
        to: localePath('/konty-hospitality')
      },
      {
        label: t('nav.forRetail'),
        description: t('nav.retailDesc'),
        to: localePath('/konty-retail')
      }
    ]
  },
  {
    label: t('nav.hospitality'),
    class: 'font-bold',
    slot: 'hospitality' as const,
    to: localePath('/konty-hospitality'),
    children: [
      { label: t('nav.barLounge'), to: localePath('/about') },
      { label: t('nav.casualDining'), to: localePath('/about') },
      { label: t('nav.cafeBakery'), to: localePath('/about') },
      { label: t('nav.fineDining'), to: localePath('/about') },
      { label: t('nav.enterprise'), to: localePath('/about') },
      { label: t('nav.foodTruck'), to: localePath('/about') },
      { label: t('nav.pizzeria'), to: localePath('/about') },
      { label: t('nav.hotelRestaurant'), to: localePath('/about') },
    ]
  },
  {
    label: t('nav.retail'),
    class: 'font-bold',
    to: localePath('/konty-retail'),
    slot: 'retail' as const,
    children: [
      { label: t('nav.generalStore'), to: localePath('/about') },
      { label: t('nav.liquorStore'), to: localePath('/about') },
      { label: t('nav.supermarket'), to: localePath('/about') },
      { label: t('nav.butcherShop'), to: localePath('/about') },
    ]
  },
  {
    label: t('nav.pricing'),
    class: 'font-bold',
    to: localePath('/pricing')
  },
  {
    label: t('nav.about'),
    class: 'font-bold',
    to: localePath('/about')
  }
])
</script>
