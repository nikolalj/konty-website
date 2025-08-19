<template>
  <UPage>
    <NuxtLoadingIndicator />

    <AppHeader />
    <!-- <AppAlertBar /> -->

    <!-- <AppBreadcrumbs v-if="breadcrumbs.length > 1" :items="breadcrumbs" /> -->

    <UPageBody class="mt-0">
      <slot />
    </UPageBody>

    <AppFooter />

    <ClientOnly>
      <PrivacyCookieConsent />
    </ClientOnly>
  </UPage>
</template>

<script setup lang="ts">
const route = useRoute()

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Početna', path: '/' }]

  let currentPath = ''
  const nameMap: Record<string, string> = {
    products: 'Proizvodi',
    'konty-retail': 'Retail',
    'konty-hospitality': 'Ugostiteljstvo',
    pricing: 'Cene',
    demo: 'Demo',
    about: 'O nama'
  }

  for (const segment of pathSegments) {
    currentPath += `/${segment}`
    const name = nameMap[segment] || (segment.charAt(0).toUpperCase() + segment.slice(1).replaceAll('-', ' '))
    crumbs.push({ name, path: currentPath })
  }
  return crumbs
})
</script>
