<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-500 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-50"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-50"
    >
      <UButton
        v-if="isVisible"
        icon="i-lucide-arrow-up"
        size="lg"
        color="primary"
        variant="solid"
        square
        class="fixed bottom-6 right-6 z-50 shadow-lg hover:shadow-xl transition-shadow duration-300 !rounded-full"
        aria-label="Scroll to top"
        @click="scrollToTop"
      />
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const isVisible = ref(false)

const handleScroll = () => {
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
