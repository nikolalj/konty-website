<template>
  <Transition name="sticky-bar">
    <div
      v-show="visible"
      class="fixed left-0 right-0 z-40 top-16 border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md"
    >
      <UContainer>
        <div class="flex h-14 items-center justify-between">
          <span class="hidden text-sm font-semibold text-gray-700 lg:block">
            {{ t('pages.solutions.beachBar.sticky.text') }}
          </span>
          <AppCTAButton
            variant="custom"
            size="sm"
            :custom-label="t('pages.solutions.beachBar.hero.cta.viber')"
            :custom-to="viberLink"
            custom-icon="i-simple-icons-viber"
            custom-class="ml-auto lg:ml-0 rounded-full bg-[#7360f2] !text-white hover:bg-[#6350e2] !ring-0"
            external
            section="beach-bar-sticky"
          />
        </div>
      </UContainer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { viberLink } = useViberLink()

const props = defineProps<{
  heroRef: HTMLElement | null
}>()

const visible = ref(false)
let observer: IntersectionObserver | null = null

watch(() => props.heroRef, (el) => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
  if (!el) return

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry) visible.value = !entry.isIntersecting
    },
    { threshold: 0 }
  )
  observer.observe(el)
}, { immediate: true })

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.sticky-bar-enter-active,
.sticky-bar-leave-active {
  transition: transform 200ms ease, opacity 200ms ease;
}
.sticky-bar-enter-from,
.sticky-bar-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
</style>
