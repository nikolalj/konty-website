<template>
  <UBreadcrumb :items="items" />
</template>

<script setup lang="ts">
const items = useBreadcrumbItems({
  schemaOrg: true
})
</script>
