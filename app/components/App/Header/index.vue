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
        <AppHeaderLocaleSuggestionBanner />

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
            <AppHeaderBreadcrumbs />
          </div>

          <div class="flex gap-1">
            <AppHeaderCountrySelector />
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
        <span class="hidden lg:block text-2xl">konty</span>
      </div>
    </template>

    <AppHeaderMenu orientation="horizontal" />

    <template #body>
      <AppHeaderMenu orientation="vertical" />
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
</script>
