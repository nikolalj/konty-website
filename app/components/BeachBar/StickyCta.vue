<template>
  <Transition name="sticky-bar">
    <div
      v-show="visible"
      class="fixed left-0 right-0 z-40 border-b border-gray-200/50 bg-white/95 shadow-sm backdrop-blur-md"
      style="top: 0"
    >
      <UContainer>
        <div class="flex h-14 items-center justify-between">
          <span class="hidden text-sm font-semibold text-gray-700 lg:block">
            {{ t('pages.solutions.beachBar.sticky.text') }}
          </span>
          <UButton
            :to="viberLink"
            external
            size="sm"
            class="ml-auto rounded-full bg-[#7360f2] font-semibold text-white hover:bg-[#6350e2] lg:ml-0"
          >
            <Icon name="i-lucide-message-circle" class="h-4 w-4" />
            {{ t('pages.solutions.beachBar.hero.cta.viber') }}
          </UButton>
        </div>
      </UContainer>
    </div>
  </Transition>
</template>

<script setup lang="ts">
const { t } = useI18n()

const props = defineProps<{
  heroRef: HTMLElement | null
}>()

const phoneNumber = computed(() =>
  t('data.company.contact.phone').replace(/[\s()-]/g, '')
)
const viberLink = computed(() => `viber://chat?number=${encodeURIComponent(phoneNumber.value)}`)

const visible = ref(false)

onMounted(() => {
  if (!props.heroRef) return

  const observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      if (entry) visible.value = !entry.isIntersecting
    },
    { threshold: 0 }
  )
  observer.observe(props.heroRef)

  onUnmounted(() => observer.disconnect())
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
