<template>
  <nav aria-label="Breadcrumb" class="py-4">
    <UContainer>
      <ol class="flex items-center space-x-2 text-sm text-gray-600">
        <li v-for="(item, index) in items" :key="item.path" class="flex items-center">
          <NuxtLink 
            v-if="index < items.length - 1"
            :to="item.path" 
            class="hover:text-primary transition-colors"
          >
            {{ item.name }}
          </NuxtLink>
          <span v-else class="text-gray-900 font-medium">
            {{ item.name }}
          </span>
          
          <span 
            v-if="index < items.length - 1"
            class="mx-2 text-gray-400"
          >
            /
          </span>
        </li>
      </ol>
    </UContainer>
    
    <!-- Add structured data -->
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