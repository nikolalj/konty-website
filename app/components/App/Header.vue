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
          class="h-full flex items-center text-sm transition-colors duration-500"
        >
          <!-- Contact info on right (or centered on homepage) -->
          <div class="flex items-center gap-4 flex-1">
            <div class="hidden sm:flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Icon name="i-lucide-mail" class="w-4 h-4" />
              <span class="hidden md:inline">contact@konty.com</span>
            </div>
            <div class="flex items-center gap-1 text-gray-600 dark:text-gray-400">
              <Icon name="i-lucide-phone" class="w-4 h-4" />
              <span>+38267607670</span>
            </div>

            <!-- Breadcrumbs on left (only on inner pages) -->
            <AppBreadcrumbs v-if="!isHomepage" />
          </div>

          <div class="flex gap-1">
            <AppCountrySelector />
            <UColorModeButton />
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
        <div class="grid grid-cols-2 gap-4 p-4">
          <div>
            <NuxtImg
              src="/images/navigation/products.avif"
              format="avif"
              loading="lazy"
              alt="Navigate to products image"
              role="presentation"
              width="200"
              height="200"
              quality="80"
              fit="cover"
              class="rounded-md"
            />
          </div>

          <ul>
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
        </div>
      </template>

      <template #hospitality-content="{ item }">
        <div class="grid grid-cols-3 gap-4 p-4">
          <div>
            <NuxtImg
              src="/images/navigation/products.avif"
              format="avif"
              loading="lazy"
              alt="Navigate to hospitality image"
              role="presentation"
              width="200"
              height="200"
              quality="80"
              fit="cover"
              class="rounded-md"
            />
          </div>

          <ul>
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
          <div>
            <NuxtImg
              src="/images/navigation/products.avif"
              format="avif"
              loading="lazy"
              alt="Navigate to retail image"
              role="presentation"
              width="200"
              height="200"
              quality="80"
              fit="cover"
              class="rounded-md"
            />
          </div>

          <ul>
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

      <template #about-content="{ item }">
        <div class="grid grid-cols-2 gap-4 p-4">
          <div>
            <NuxtImg
              src="/images/navigation/products.avif"
              format="avif"
              loading="lazy"
              alt="Navigate to retail image"
              role="presentation"
              width="200"
              height="200"
              quality="80"
              fit="cover"
              class="rounded-md"
            />
          </div>

          <ul>
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
        :to="localePath('/contact-us')"
        size="lg"
        variant="outline"
        color="primary"
        :aria-label="t('ui.cta.secondary')"
        class="border-1"
      >
        {{ t('ui.cta.secondary') }}
      </UButton>
      <UButton
        :to="localePath('/demo')"
        size="lg"
        variant="solid"
        color="primary"
        :aria-label="t('ui.cta.primary')"
      >
        {{ t('ui.cta.primary') }}
      </UButton>
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
    label: t('ui.navigation.main.products'),
    class: 'font-bold',
    slot: 'products' as const,
    children: [
      {
        label: t('ui.navigation.products.forHospitality'),
        description: t('ui.navigation.main.hospitalityDesc'),
        to: localePath('/konty-hospitality')
      },
      {
        label: t('ui.navigation.products.forRetail'),
        description: t('ui.navigation.main.retailDesc'),
        to: localePath('/konty-retail')
      },
      {
        label: t('ui.navigation.products.download'),
        description: t('ui.navigation.main.downloadDesc'),
        to: localePath('/download')
      }
    ]
  },
  {
    label: t('ui.navigation.main.hospitality'),
    class: 'font-bold',
    slot: 'hospitality' as const,
    to: localePath('/konty-hospitality'),
    children: [
      { label: t('ui.navigation.categories.barLounge'), to: localePath('/about') },
      { label: t('ui.navigation.categories.casualDining'), to: localePath('/about') },
      { label: t('ui.navigation.categories.cafeBakery'), to: localePath('/about') },
      { label: t('ui.navigation.categories.fineDining'), to: localePath('/about') },
      { label: t('ui.navigation.categories.enterprise'), to: localePath('/about') },
      { label: t('ui.navigation.categories.foodTruck'), to: localePath('/about') },
      { label: t('ui.navigation.categories.pizzeria'), to: localePath('/about') },
      { label: t('ui.navigation.categories.hotelRestaurant'), to: localePath('/about') },
    ]
  },
  {
    label: t('ui.navigation.main.retail'),
    class: 'font-bold',
    to: localePath('/konty-retail'),
    slot: 'retail' as const,
    children: [
      { label: t('ui.navigation.categories.generalStore'), to: localePath('/about') },
      { label: t('ui.navigation.categories.liquorStore'), to: localePath('/about') },
      { label: t('ui.navigation.categories.supermarket'), to: localePath('/about') },
      { label: t('ui.navigation.categories.butcherShop'), to: localePath('/about') },
    ]
  },
  {
    label: t('ui.navigation.main.pricing'),
    class: 'font-bold',
    to: localePath('/pricing')
  },
  {
    label: t('ui.navigation.main.about'),
    class: 'font-bold',
    slot: 'about' as const,
    children: [
      { label: t('ui.navigation.about.contact'), to: localePath('/about/contact') },
      { label: t('ui.navigation.about.clientStories'), to: localePath('/about/client-stories') },
      { label: t('ui.navigation.about.partners'), to: localePath('/about/partners') },
    ]
  }
])
</script>
