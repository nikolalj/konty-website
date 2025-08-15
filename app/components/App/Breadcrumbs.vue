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
interface BreadcrumbItem {
  name: string
  path: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>
