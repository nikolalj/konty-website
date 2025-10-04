<template>
  <div>
    <UDropdownMenu
      :items="items"
      :modal="false"
      :ui="{
        content: 'min-w-64',
      }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        square
        :aria-label="`Current country: ${currentLocale?.name}`"
        class="relative dark"
      >
        <div
          v-if="suggestedLocale && suggestedLocale !== locale"
          class="absolute top-0 -right-1 size-2 bg-primary-500 rounded-full animate-pulse"
        />

        <UIcon
          :name="currentLocale?.flag || 'i-lucide:globe'"
          class="size-5"
        />
      </UButton>

      <template #item="{ item }">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <UIcon :name="item.flag" class="size-5" />
            <span class="text-sm">{{ item.label }}</span>
          </div>

          <div class="flex items-center gap-2">
            <UBadge
              v-if="item.isRecommended"
              size="xs"
              color="primary"
              variant="soft"
            >
              {{ t('ui.common.labels.recommended', 'Recommended') }}
            </UBadge>

            <UIcon
              v-if="item.code === currentLocale?.code"
              name="i-lucide:check"
              class="size-4 text-primary"
            />
          </div>
        </div>
      </template>
    </UDropdownMenu>
  </div>
</template>

<script setup lang="ts">
import type { LocaleConfig, ValidLocale } from '~/types/locale'
import { LOCALES } from '~/config/locale.config.mjs'

const nuxtApp = useNuxtApp()
const switchLocalePath = useSwitchLocalePath()
const { t, locale, locales } = useI18n()
const currentLocale = LOCALES.find(l => l.code === locale.value)

const suggestedLocale: Ref<ValidLocale | undefined> = ref()

onMounted(() => {
  suggestedLocale.value = nuxtApp.payload.detectedLocale !== locale.value ? nuxtApp.payload.detectedLocale as ValidLocale | undefined : undefined
})

// Build enhanced dropdown items
const items = computed(() => {
  const localeItems = (locales.value as LocaleConfig[]).map(loc => ({
    label: loc.name,
    code: loc.code,
    flag: loc.flag,
    type: 'link',
    to: switchLocalePath(loc.code),
    isRecommended: suggestedLocale.value === loc.code,
    onSelect: async () => {
      if (locale.value === loc.code) return

      try {
        const cookie = useCookie('konty-locale')
        cookie.value = JSON.stringify({
          locale: loc.code,
          explicit: true
        })

        const newPath = switchLocalePath(loc.code)
        if (newPath) {
          await navigateTo(newPath)
        }
      } catch (error) {
        console.error('[CountrySelector] Failed to switch locale:', error)
      }
    }
  }))

  // Sort to put recommended first if exists
  if (suggestedLocale.value) {
    localeItems.sort((a, b) => {
      if (a.isRecommended) return -1
      if (b.isRecommended) return 1
      return 0
    })
  }

  return [localeItems]
})
</script>
