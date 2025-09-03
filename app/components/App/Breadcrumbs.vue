<template>
  <UBreadcrumb :items="items" />
</template>

<script setup lang="ts">
const items = useBreadcrumbItems()

const breadcrumbSchema = computed(() => ({
  itemListElement: items.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: item.path
  }))
}))

useSchemaOrg([
  defineBreadcrumb(breadcrumbSchema.value)
])
</script>
