<template>
  <UBreadcrumb
    v-if="!isHomepage"
    :items="localizedItems"
    class="dark"
    :ui="{
      link: 'text-gray-300 hover:text-white',
      linkActive: 'text-white',
      separator: 'text-gray-500'
    }"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const { public: { siteUrl } } = useRuntimeConfig()

const isHomepage = computed(() => {
  const removeTrailingSlash = (str: string) => str.replace(/\/$/, '')
  return removeTrailingSlash(route.path) === removeTrailingSlash(localePath('/'))
})

// Don't use automatic schema generation since we need localized labels
const items = useBreadcrumbItems({
  schemaOrg: false // Disabled - we'll handle it manually
})

// Segments that are not real pages — render as text, not links
const NON_PAGE_SEGMENTS = ['offers']

const localizedItems = computed(() => {
  return items.value.map((item, index) => {
    // First item is always home - use icon instead of label
    if (index === 0) {
      return {
        ...item,
        label: '',  // Empty label since we'll show icon
        icon: 'i-lucide-home',
        ariaLabel: t('ui.breadcrumb.index') // For accessibility
      }
    }

    const segments = item.to?.split('/').filter(Boolean) || []
    const segmentKey = segments[segments.length - 1] || 'index'
    const translationKey = `ui.breadcrumb.${segmentKey}`
    const translation = t(translationKey)
    const isNonPage = NON_PAGE_SEGMENTS.includes(segmentKey)

    return {
      ...item,
      ...(isNonPage ? { to: undefined } : {}),
      label: translation !== translationKey ? translation : item.label
    }
  })
})

// Manually generate BreadcrumbList schema with localized labels
// Filter out non-page segments (no `to`) from structured data
useSchemaOrg([
  defineBreadcrumb({
    itemListElement: localizedItems.value
      .filter(item => item.to)
      .map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: index === 0 ? t('ui.breadcrumb.index') : item.label,
        item: `${siteUrl}${item.to}`
      }))
  })
])
</script>
