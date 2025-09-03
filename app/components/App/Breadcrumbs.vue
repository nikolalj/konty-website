<template>
  <UBreadcrumb :items="items" />
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const items = useBreadcrumbItems()

const breadcrumbSchema = computed(() => ({
  itemListElement: items.value.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.label,
    item: `${config.public.siteUrl}${item.to}`
  }))
}))

watch(breadcrumbSchema, val => {
  useSchemaOrg([
    defineBreadcrumb(val)
  ])
}, { immediate: true })
</script>
