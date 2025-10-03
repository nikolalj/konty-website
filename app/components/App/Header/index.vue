<template>
  <UHeader
    class="fixed top-0 w-full h-auto transition-[background-color,box-shadow,color] duration-1000 border-none"
    :class="!isHeaderSolid ? 'bg-transparent' : 'bg-[#201633]/90'"
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
        <AppHeaderLocaleSuggestionBanner />

        <UContainer
          class="h-full flex items-center text-sm transition-colors duration-500"
        >
          <!-- Contact info on right (or centered on homepage) -->
          <div class="flex items-center gap-4 flex-1">
            <div
              class="hidden sm:flex items-center gap-1 text-gray-300"
            >
              <Icon name="i-lucide-mail" class="w-4 h-4" />
              <span class="hidden md:inline">contact</span>
            </div>
            <div
              class="flex items-center gap-1 text-gray-300"
            >
              <Icon name="i-lucide-phone" class="w-4 h-4" />
              <span>+38267607670</span>
            </div>

            <!-- Breadcrumbs on left (only on inner pages) -->
            <AppHeaderBreadcrumbs />
          </div>

          <div class="flex gap-1">
            <AppHeaderCountrySelector />
            <UColorModeButton class="dark" />
          </div>
        </UContainer>
      </div>
    </template>

    <template #left>
      <ULink to="/" class="flex items-center gap-2 shrink-0">
        <NuxtImg
          src="/images/branding/logo-dark.svg"
          width="40"
          height="40"
          alt="Konty logo"
        />
        <span class="hidden md:block text-2xl text-white">konty</span>
      </ULink>
      <AppHeaderMenu orientation="horizontal" class="hidden lg:flex lg:ml-12" />
    </template>

    <template #body>
      <AppHeaderMenu orientation="vertical" />
    </template>

    <template #right>
      <UButton
        :to="localePath('/contact')"
        size="lg"
        variant="outline"
        class="ring-2 ring-[#fa7faa] hover:bg-[#61356c] text-white font-semibold"
        :aria-label="t('ui.cta.secondary')"
      >
        {{ t('ui.cta.secondary') }}
      </UButton>
      <UButton
        :to="localePath('/demo')"
        size="lg"
        class="bg-white hover:bg-[#f88eb3] font-semibold text-black"
        @click="handleGetDemo"
      >
        {{ t('ui.cta.primary') }}
      </UButton>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { y } = useWindowScroll()
const { t } = useI18n()
const { track } = useTracking()
const localePath = useLocalePath()

const ENTER_SOLID = 56
const EXIT_SOLID = 8

const isHeaderSolid = ref(false)
const isTopBarCollapsed = ref(false)

watch(
  y,
  () => {
    const cur = y.value

    if (!isHeaderSolid.value && cur > ENTER_SOLID) isHeaderSolid.value = true
    else if (isHeaderSolid.value && cur < EXIT_SOLID)
      isHeaderSolid.value = false

    if (!isTopBarCollapsed.value && cur > ENTER_SOLID)
      isTopBarCollapsed.value = true
    else if (isTopBarCollapsed.value && cur < EXIT_SOLID)
      isTopBarCollapsed.value = false
  },
  { immediate: true }
)

function handleGetDemo() {
  track('get_a_demo_cta', { location: 'Header' })
}
</script>
