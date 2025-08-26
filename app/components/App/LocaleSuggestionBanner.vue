<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0"
    enter-to-class="translate-y-0 translate-x-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="translate-y-0 translate-x-0 opacity-100"
    leave-to-class="translate-y-full sm:translate-y-0 sm:translate-x-full opacity-0"
  >
    <div
      v-if="shouldShow"
      class="fixed bottom-4 sm:bottom-auto sm:top-20 right-0 sm:right-4 left-0 sm:left-auto z-50 mx-4 sm:mx-0"
    >
      <div class="rounded bg-[var(--ui-bg)]">
        <div class="flex items-center gap-3 h-full p-4">
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

          <p>{{ t('banner.suggestion', { country }) }}</p>

          <UButton
            variant="ghost"
            @click="stayOnThisLocale()"
          >
            {{ $t('common.stayHere') }}
          </UButton>

          <UButton
            color="primary"
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
import type { LocaleConfig, ValidLocale } from '~/types/locale'

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
  setTimeout(() => {
    shouldShow.value = !!suggestedLocale.value && !cookie.value.explicit && !shouldRespectDismissal
  }, 3000)
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
