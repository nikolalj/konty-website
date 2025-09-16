<template>
  <UNavigationMenu
    v-if="props.orientation === 'horizontal'"
    orientation="horizontal"
    :items="items"
    variant="link"
    :ui="{
      link: 'text-base text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300',
      linkLeadingIcon: 'text-gray-900 dark:text-white'
    }"
  >
    <template #products-content="{ item }">
      <div class="grid grid-cols-2 gap-4 p-4">
        <div>
          <NuxtImg
            src="/images/navigation/products.avif"
            format="avif"
            loading="lazy"
            alt="Navigate to products image"
            role="presentation"
            width="200"
            height="200"
            quality="80"
            fit="cover"
            class="rounded-md"
          />
        </div>

        <ul>
          <li v-for="child in item.children" :key="child.label">
            <ULink :to="child.to || '#'" class="inline-block text-sm text-left rounded-md p-3 transition-colors hover:bg-elevated/50">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
              <p v-if="child.description" class="text-muted line-clamp-2">
                {{ child.description }}
              </p>
            </ULink>
          </li>
        </ul>
      </div>
    </template>

    <template #hospitality-content="{ item }">
      <div class="grid grid-cols-3 gap-4 p-4">
        <div>
          <NuxtImg
            src="/images/navigation/products.avif"
            format="avif"
            loading="lazy"
            alt="Navigate to hospitality image"
            role="presentation"
            width="200"
            height="200"
            quality="80"
            fit="cover"
            class="rounded-md"
          />
        </div>

        <ul>
          <li v-for="child in item.children.slice(0, Math.ceil(item.children.length / 2))" :key="child.label">
            <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
            </ULink>
          </li>
        </ul>

        <ul class="col-span-1 space-y-1">
          <li v-for="child in item.children.slice(Math.ceil(item.children.length / 2))" :key="child.label">
            <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
            </ULink>
          </li>
        </ul>
      </div>
    </template>

    <template #retail-content="{ item }">
      <div class="grid grid-cols-2 gap-4 p-4">
        <div>
          <NuxtImg
            src="/images/navigation/products.avif"
            format="avif"
            loading="lazy"
            alt="Navigate to retail image"
            role="presentation"
            width="200"
            height="200"
            quality="80"
            fit="cover"
            class="rounded-md"
          />
        </div>

        <ul>
          <li v-for="child in item.children" :key="child.label">
            <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
            </ULink>
          </li>
        </ul>
      </div>
    </template>

    <template #about-content="{ item }">
      <div class="grid grid-cols-2 gap-4 p-4">
        <div>
          <NuxtImg
            src="/images/navigation/products.avif"
            format="avif"
            loading="lazy"
            alt="Navigate to retail image"
            role="presentation"
            width="200"
            height="200"
            quality="80"
            fit="cover"
            class="rounded-md"
          />
        </div>

        <ul>
          <li v-for="child in item.children" :key="child.label">
            <ULink :to="child.to || '#'" class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50">
              <p class="font-medium text-highlighted">
                {{ child.label }}
              </p>
            </ULink>
          </li>
        </ul>
      </div>
    </template>
  </UNavigationMenu>

  <UNavigationMenu
    v-else
    :items="items"
    orientation="vertical"
    class="-mx-2.5"
  />
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const props = defineProps({
  orientation: {
    type: String as PropType<'horizontal' | 'vertical'>,
    required: true
  }
})

const items = computed(() => [
  {
    label: t('ui.navigation.main.products'),
    class: 'font-bold',
    slot: 'products' as const,
    children: [
      {
        label: t('ui.navigation.products.forHospitality'),
        description: t('ui.navigation.main.hospitalityDesc'),
        to: localePath('/products/hospitality')
      },
      {
        label: t('ui.navigation.products.forRetail'),
        description: t('ui.navigation.main.retailDesc'),
        to: localePath('/products/retail')
      },
      {
        label: t('ui.navigation.products.download'),
        to: localePath('/products/download')
      },
      {
        label: t('ui.navigation.products.faqdocs'),
        to: localePath('/products/faqdocs')
      }
    ]
  },
  {
    label: t('ui.navigation.main.hospitality'),
    class: 'font-bold',
    slot: 'hospitality' as const,
    children: [
      { label: t('ui.navigation.categories.restaurants'), to: localePath('/solutions/restaurants') },
      { label: t('ui.navigation.categories.barsCafes'), to: localePath('/solutions/bars-cafes') },
      { label: t('ui.navigation.categories.fastFood'), to: localePath('/solutions/fast-food') },
    ]
  },
  {
    label: t('ui.navigation.main.retail'),
    class: 'font-bold',
    slot: 'retail' as const,
    children: [
      { label: t('ui.navigation.categories.grocerySupermarkets'), to: localePath('/solutions/grocery-supermarkets') },
      { label: t('ui.navigation.categories.clothingBoutiques'), to: localePath('/solutions/clothing-boutiques') },
      { label: t('ui.navigation.categories.convenienceStores'), to: localePath('/solutions/convenience-stores') },
      { label: t('ui.navigation.categories.b2b'), to: localePath('/solutions/b2b') },
    ]
  },
  {
    label: t('ui.navigation.main.pricing'),
    class: 'font-bold',
    to: localePath('/pricing')
  },
  {
    label: t('ui.navigation.main.about'),
    class: 'font-bold',
    slot: 'about' as const,
    children: [
      { label: t('ui.navigation.about.contact'), to: localePath('/about/contact') },
      { label: t('ui.navigation.about.clientStories'), to: localePath('/about/client-stories') },
      { label: t('ui.navigation.about.partners'), to: localePath('/about/partners') },
    ]
  }
])
</script>
