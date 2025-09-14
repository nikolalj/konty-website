<template>
  <UBreadcrumb v-if="!isHomepage" :items="localizedItems" />
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { public: { siteUrl } } = useRuntimeConfig()

const isHomepage = computed(() => route.path === localePath('/'))

//@ts-expect-error adsnsak dnsad jasndk jsankd
window.isHomepage = isHomepage
//@ts-expect-error adsnsak dnsad jasndk jsankd
window.route = route
//@ts-expect-error adsnsak dnsad jasndk jsankd
window.localePath = localePath

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
        ariaLabel: t('ui.breadcrumb.index') // For accessibility
      }
    }

    const segments = item.to?.split('/').filter(Boolean) || []
    const segmentKey = segments[segments.length - 1] || 'index'
    const translationKey = `ui.breadcrumb.${segmentKey}`
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
      name: index === 0 ? t('ui.breadcrumb.index') : item.label,
      item: `${siteUrl}${item.to}`
    }))
  })
])
</script>
