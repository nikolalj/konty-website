<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const i18nHead = useLocaleHead({
  dir: true,
  seo: true
})

// Filter out general hreflang enteries like en and leave specific ones en-US
const filteredHead = computed(() => {
  const head = { ...i18nHead.value }

  if (head.link) {
    head.link = head.link.filter(link => {
      if (!link.hreflang) return true
      return link.hreflang.includes('-') || link.hreflang === 'x-default'
    })
  }

  return head
})

useHead(filteredHead)
</script>
