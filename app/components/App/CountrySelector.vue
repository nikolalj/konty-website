<template>
  <div>
    <!-- Show skeleton during initial detection -->
    <div v-if="isDetecting && !currentLocale" class="animate-pulse">
      <div class="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>

    <!-- Show dropdown when ready -->
    <UDropdownMenu
      v-else
      :items="items"
      :modal="false"
      :ui="{
        content: 'min-w-52'
      }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        square
        :disabled="isSwitching"
        :aria-label="`Current country: ${currentLocale?.name}`"
      >
        <UIcon
          v-if="!isSwitching"
          :name="currentLocale?.flag || 'i-lucide:globe'"
          class="size-5"
        />
        <UIcon
          v-else
          name="i-lucide:loader-2"
          class="size-5 animate-spin"
        />
      </UButton>

      <template #item="{ item }">
        <UIcon :name="item.flag" class="size-5" />
        <span class="truncate">{{ item.label }}</span>
        <UIcon
          v-if="item.code === currentLocale?.code"
          name="i-lucide:check"
          class="flex-shrink-0 ms-auto size-4 text-primary"
        />
      </template>
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import type { LocaleConfig } from '~/types/locale'

const { locale, locales } = useI18n()
const { changeLocale, currentLocale, isSwitching, isDetecting } = useCountryDetection()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

// Build dropdown items from available locales
const items = computed(() => {
  const localeItems = (locales.value as LocaleConfig[]).map(loc => ({
    label: loc.name,
    code: loc.code,
    flag: loc.flag,
    onSelect: async () => {
      if (locale.value !== loc.code && !isSwitching.value) {
        try {
          // Change locale - mark as explicit user choice (true)
          await changeLocale(loc.code, true)

          // Use switchLocalePath for smooth client-side routing
          const newPath = switchLocalePath(loc.code)
          if (newPath && newPath !== route.fullPath) {
            await navigateTo(newPath)
          }
        } catch (error) {
          console.error('Failed to switch locale:', error)
        }
      }
    }
  }))

  return [localeItems]
})
</script>
