<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  "@type": string
  position: number
  name: string
  item: string
}

interface Props {
  items: Array<{
    name: string
    path: string
  }>
}

const props = defineProps<Props>()
const config = useRuntimeConfig()

const breadcrumbItems = computed<BreadcrumbItem[]>(() => {
  const siteUrl = config.public.siteUrl || 'https://konty.com'
  return props.items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `${siteUrl}${item.path}`
  }))
})

const breadcrumbSchema = computed(() => {
  // Only generate schema if we have more than one breadcrumb item
  if (props.items.length <= 1) {
    return null
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.value.map(item => ({
      "@type": "ListItem",
      "position": item.position,
      "name": item.name,
      "item": {
        "@type": "WebPage",
        "@id": item.item,
        "url": item.item,
        "name": item.name
      }
    }))
  }
})

// Only add schema if we have breadcrumbs to show
watchEffect(() => {
  if (breadcrumbSchema.value) {
    useHead({
      script: [
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify(breadcrumbSchema.value)
        }
      ]
    })
  }
})
</script>