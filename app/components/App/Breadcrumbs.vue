<template>
  <UBreadcrumb :items="items" />
</template>

<script setup lang="ts">
import { useRuntimeConfig } from '#imports'

const config = useRuntimeConfig()
const items = useBreadcrumbItems()

useSchemaOrg([
  defineBreadcrumb({
    itemListElement: items.value.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${config.public.siteUrl}${item.to}`
    }))
  })
])
</script>
