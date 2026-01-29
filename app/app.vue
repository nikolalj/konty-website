<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const route = useRoute()

const i18nHead = useLocaleHead({
  dir: true,
  seo: true
})

// Check if current page is a blog post (hreflang handled by the page itself)
const isBlogPost = computed(() => route.path.includes('/blog/') && route.params.slug)

// Filter out general hreflang entries like 'en' and leave specific ones 'en-US'
// Also skip hreflang entirely for blog posts (they handle it themselves)
const filteredHead = computed(() => {
  const head = { ...i18nHead.value }

  if (head.link) {
    head.link = head.link.filter(link => {
      if (!link.hreflang) return true
      // Skip all hreflang for blog posts - page handles it
      if (isBlogPost.value) return false
      return link.hreflang.includes('-') || link.hreflang === 'x-default'
    })
  }

  return head
})

useHead(filteredHead)
</script>
