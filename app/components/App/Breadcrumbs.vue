<template>
  <UBreadcrumb :items="localizedItems" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const { public: { siteUrl } } = useRuntimeConfig()

// Don't use automatic schema generation since we need localized labels
const items = useBreadcrumbItems({
  schemaOrg: false // Disabled - we'll handle it manually
})

const localizedItems = computed(() => {
  return items.value.map((item, index) => {
    // First item is always home - use icon instead of label
    if (index === 0) {
      return {
        ...item,
        label: '',  // Empty label since we'll show icon
        icon: 'i-heroicons-home-20-solid',
        ariaLabel: t('breadcrumb.items.index') // For accessibility
      }
    }

    const segments = item.to?.split('/').filter(Boolean) || []
    const segmentKey = segments[segments.length - 1] || 'index'
    const translationKey = `breadcrumb.items.${segmentKey}`
    const translation = t(translationKey)

    return {
      ...item,
      label: translation !== translationKey ? translation : item.label
    }
  })
})

// Manually generate BreadcrumbList schema with localized labels
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: localizedItems.value.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      // For schema, use the aria label for home (index 0) or regular label
      name: index === 0 ? t('breadcrumb.items.index') : item.label,
      item: `${siteUrl}${item.to}`
    }))
  })
])
</script>
