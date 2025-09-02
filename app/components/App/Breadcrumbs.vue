<template>
  <nav aria-label="Breadcrumb" class="text-muted p-0">
    <ol class="flex items-center h-12 text-sm">
      <li v-for="(item, index) in items" :key="item.path" class="flex items-center">
        <!-- Home icon for first item -->
        <template v-if="index === 0">
          <NuxtLink
            :to="localePath(item.path)"
          >
            <UIcon name="i-heroicons-home-20-solid" class="w-4 h-4" />
            <span class="sr-only">{{ item.name }}</span>
          </NuxtLink>
        </template>

        <!-- Regular breadcrumb items -->
        <template v-else>
          <!-- Separator -->
          <UIcon name="i-heroicons-chevron-right-20-solid" class="w-4 h-4 mx-2" />

          <!-- Link for non-current pages -->
          <NuxtLink
            v-if="index < items.length - 1"
            :to="localePath(item.path)"
          >
            {{ item.name }}
          </NuxtLink>

          <!-- Current page (no link) -->
          <span
            v-else
            aria-current="page"
          >
            {{ item.name }}
          </span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()

const items = computed(() => {
  // Remove locale prefix from path for parsing
  const cleanPath = route.path.replace(/^\/(me|ba|us)/, '') || '/'
  const pathSegments = cleanPath.split('/').filter(Boolean)

  // Start with home
  const crumbs = [{
    name: t('nav.home'),
    path: '/'
  }]

  // Skip if we're on homepage
  if (pathSegments.length === 0) {
    return crumbs
  }

  let currentPath = ''

  for (const segment of pathSegments) {
    currentPath += `/${segment}`

    // Try to get translated name
    let name = ''
    switch(segment) {
      case 'products':
        name = t('nav.products')
        break
      case 'konty-retail':
        name = t('nav.kontyRetail')
        break
      case 'konty-hospitality':
        name = t('nav.kontyHospitality')
        break
      case 'pricing':
        name = t('nav.pricing')
        break
      case 'demo':
        name = t('nav.demo')
        break
      case 'about':
        name = t('nav.about')
        break
      case 'privacy':
        name = t('nav.privacy')
        break
      case 'terms':
        name = t('nav.terms')
        break
      default:
        // Fallback: capitalize and clean up segment
        name = segment.charAt(0).toUpperCase() + segment.slice(1).replaceAll('-', ' ')
    }

    crumbs.push({ name, path: currentPath })
  }

  return crumbs
})
</script>
