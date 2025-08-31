<template>
  <Transition
    enter-active-class="transition-all duration-200 ease-out"
    enter-from-class="-translate-y-full opacity-0"
    enter-to-class="translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 opacity-100"
    leave-to-class="-translate-y-full opacity-0"
  >
    <div
      v-if="shouldShow"
      class="w-full z-100"
    >
      <div class="rounded bg-[var(--ui-bg)]">
        <div class="flex items-center gap-3 h-full p-1 justify-center">
          <UButton
            size="xs"
            color="neutral"
            variant="ghost"
            square
            :aria-label="$t('common.dismiss', 'Dismiss')"
            @click="dismissBanner()"
          >
            <UIcon name="i-lucide:x" class="size-3.5" />
          </UButton>

          <p class="text-sm">{{ t('banner.suggestion', { country }) }}</p>

          <UButton
            variant="ghost"
            size="sm"
            @click="stayOnThisLocale()"
          >
            {{ $t('common.stayHere') }}
          </UButton>

          <UButton
            variant="subtle"
            size="sm"
            @click="acceptSuggestedLocale()"
          >
            {{ $t('banner.switchTo') }}
          </UButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { LocaleConfig, ValidLocale, LocaleCookie } from '~/types/locale'

const nuxtApp = useNuxtApp()

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const route = useRoute()
const cookie = useCookie<LocaleCookie>('konty-locale')

const shouldShow = ref(false)

const suggestedLocale: Ref<ValidLocale | undefined> = ref(undefined)

onMounted(() => {
  if (!cookie.value) return false

  suggestedLocale.value = nuxtApp.payload.detectedLocale !== locale.value ? nuxtApp.payload.detectedLocale as ValidLocale | undefined : undefined

  // Check if banner was recently dismissed
  const dismissedData = sessionStorage.getItem('locale-banner-dismissed')
  let shouldRespectDismissal = false

  if (dismissedData) {
    try {
      const { timestamp, locale: dismissedLocale, suggestedLocale: dismissedSuggestion } = JSON.parse(dismissedData)
      const hoursSinceDismissal = (Date.now() - timestamp) / (1000 * 60 * 60)

      // Respect dismissal if Less than 4 hours ago unless user already saw this exact suggestion
      if (hoursSinceDismissal < 4 && dismissedLocale === locale.value && dismissedSuggestion === suggestedLocale.value) {
        shouldRespectDismissal = true
      }
    } catch {
      // Invalid data, ignore it
      sessionStorage.removeItem('locale-banner-dismissed')
    }
  }

  // Show banner only if:
  // 1. There's a locale mismatch
  // 2. User hasn't made explicit choice
  // 3. Banner wasn't recently dismissed for this same suggestion
  shouldShow.value = !!suggestedLocale.value && !cookie.value.explicit && !shouldRespectDismissal

  // Auto-dismiss on scroll
  if (shouldShow.value) {
    window.addEventListener('scroll', handleScroll, { passive: true })
  }
})

const country = computed(() => (locales.value as LocaleConfig[]).find(l => l.code === suggestedLocale.value)?.name)

async function acceptSuggestedLocale() {
  if (!suggestedLocale.value) return

  const newPath = switchLocalePath(suggestedLocale.value)
  if (!newPath || newPath === route.fullPath) return

  saveLocaleToCookie(suggestedLocale.value)

  locale.value = suggestedLocale.value

  await navigateTo(newPath)

  shouldShow.value = false
}

async function stayOnThisLocale() {
  saveLocaleToCookie(locale.value)
  shouldShow.value = false
}

// Handle dismissing the banner (mark current as explicit choice)
function saveLocaleToCookie(locale: ValidLocale) {
  cookie.value = {
    locale,
    explicit: true
  }
}

function dismissBanner() {
  // Store dismissal time in sessionStorage with 4-hour expiry
  const dismissalData = {
    timestamp: Date.now(),
    locale: locale.value,
    suggestedLocale: suggestedLocale.value
  }

  // Use sessionStorage for tab persistence + time check
  sessionStorage.setItem('locale-banner-dismissed', JSON.stringify(dismissalData))

  // Hide banner immediately
  shouldShow.value = false
}

const handleScroll = () => {
  if (window.scrollY > 100) {
    shouldShow.value = false
    window.removeEventListener('scroll', handleScroll)
  }
}

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
/* Ensure banner appears above other content but below modals */
@media (max-width: 639px) {
  /* Mobile: slide up from bottom */
  .fixed {
    max-width: calc(100vw - 2rem);
  }
}
</style>
