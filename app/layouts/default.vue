<template>
  <div class="min-h-screen flex flex-col">
    <app-top-bar />
    <app-header />
    <app-alert-bar />
    <app-breadcrumbs v-if="breadcrumbs.length > 1" :items="breadcrumbs" />
    <main class="flex-1">
      <slot />
    </main>
    <app-footer />
    
    <!-- Cookie Consent Banner -->
    <ClientOnly>
      <privacy-cookie-consent />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// Generate breadcrumbs based on current route
const route = useRoute()

const breadcrumbs = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean)
  const crumbs = [{ name: 'Početna', path: '/' }]

  let currentPath = ''

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`

    // Map route segments to human-readable names
    const nameMap: Record<string, string> = {
      'products': 'Proizvodi',
      'konty-retail': 'Retail',
      'konty-hospitality': 'Ugostiteljstvo',
      'pricing': 'Cene',
      'demo': 'Demo',
      'about': 'O nama'
    }

    const name = nameMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    crumbs.push({ name, path: currentPath })
  })

  return crumbs
})
</script>
