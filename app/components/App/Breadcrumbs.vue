<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <UContainer>
      <ol class="flex items-center gap-2 text-sm text-gray-600">
        <li v-for="(item, index) in items" :key="item.path" class="flex items-center">
          <template v-if="index < items.length - 1">
            <NuxtLink :to="item.path" class="hover:text-primary transition-colors">
              {{ item.name }}
            </NuxtLink>
            <span class="mx-2 text-gray-400" aria-hidden="true">/</span>
          </template>
          <template v-else>
            <span class="text-gray-900 font-medium" aria-current="page">{{ item.name }}</span>
          </template>
        </li>
      </ol>
    </UContainer>

    <!-- Structured data -->
    <schema-breadcrumb-list :items="items" />
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()

const items = computed(() => {
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
