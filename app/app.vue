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
useHead(i18nHead)
</script>
