<template>
  <div>
    <!-- Show dropdown -->
    <UDropdownMenu
      :items="items"
      :modal="false"
      :ui="{
        content: 'min-w-64'
      }"
    >
      <UButton
        color="neutral"
        variant="ghost"
        square
        :disabled="isSwitching"
        :aria-label="`Current country: ${currentLocale?.name}`"
        class="relative"
      >
        <!-- Show suggestion indicator if there's a mismatch -->
        <div
          v-if="suggestedLocale && suggestedLocale !== locale"
          class="absolute -top-1 -right-1 size-2 bg-primary-500 rounded-full animate-pulse"
        />

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
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center gap-3">
            <UIcon :name="item.flag" class="size-5" />
            <span class="text-sm">{{ item.label }}</span>
          </div>

          <div class="flex items-center gap-2">
            <!-- Recommended badge -->
            <UBadge
              v-if="item.isRecommended"
              size="xs"
              color="primary"
              variant="soft"
            >
              {{ $t('common.recommended', 'Recommended') }}
            </UBadge>

            <!-- Current locale check -->
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
import type { LocaleConfig } from '~/types/locale'

const { locale, locales } = useI18n()
const { changeLocale, currentLocale, isSwitching, suggestedLocale } = useCountryDetection()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()

// Build enhanced dropdown items
const items = computed(() => {
  const suggested = suggestedLocale.value

  const localeItems = (locales.value as LocaleConfig[]).map(loc => ({
    label: loc.name,
    code: loc.code,
    flag: loc.flag,
    currency: `${loc.currencySymbol} ${loc.currency}`,
    isRecommended: suggested === loc.code,
    onSelect: async () => {
      if (locale.value !== loc.code && !isSwitching.value) {
        try {
          // Update cookie to mark as explicit user choice
          const cookie = useCookie('konty-locale')
          cookie.value = JSON.stringify({
            locale: loc.code,
            explicit: true,
            wasRedirected: false
          })

          // Navigate to localized path - the navigation will handle locale switching
          const newPath = switchLocalePath(loc.code)
          if (newPath) {
            // Navigate internally - i18n module will handle locale switch and load translations
            await navigateTo(newPath)
          }
        } catch (error) {
          console.error('[CountrySelector] Failed to switch locale:', error)
        }
      }
    }
  }))

  // Sort to put recommended first if exists
  if (suggested) {
    localeItems.sort((a, b) => {
      if (a.isRecommended) return -1
      if (b.isRecommended) return 1
      return 0
    })
  }

  return [localeItems]
})
</script>

<style scoped>
/* Pulsing dot animation for suggestion indicator */
@keyframes pulse-dot {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.5);
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
