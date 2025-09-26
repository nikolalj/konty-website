<template>
  <UNavigationMenu
    v-if="props.orientation === 'horizontal'"
    orientation="horizontal"
    content-orientation="vertical"
    :items="items"
    variant="link"
    :ui="{
      link: 'text-base text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300',
      viewport: 'sm:w-(--reka-navigation-menu-viewport-width)',
      content: 'sm:w-auto sm:max-w-none'
    }"
  >
    <template #products-content="{ item }">
      <div class="p-4 space-y-4 min-w-[510px]">
        <div class="grid grid-cols-2 gap-4 mb-6">
          <template
            v-for="child in item.children.slice(0, 2)"
            :key="child.label"
          >
            <ULink
              :to="child.to || '#'"
              class="relative group block overflow-hidden aspect-[4/3]"
              :exact="route.path === child.to"
            >
              <NuxtImg
                v-if="child.image"
                :src="child.image.src"
                format="avif"
                loading="lazy"
                :alt="child.image.alt"
                quality="80"
                class="absolute inset-0 w-full h-full object-cover"
              />

              <div
                class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"
              />

              <div
                class="absolute inset-0 flex items-end justify-center pb-3 px-3"
              >
                <p
                  class="text-white text-sm font-bold text-center leading-tight line-clamp-2"
                >
                  {{ child.label }}
                </p>
              </div>
            </ULink>
          </template>
        </div>

        <div
          v-if="item.children.length > 2"
          class="flex items-center justify-center"
        >
          <template
            v-for="(child, index) in item.children.slice(2)"
            :key="child.label"
          >
            <ULink
              :to="child.to || '#'"
              class="flex items-center space-x-2 text-sm font-semibold text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50"
              :exact="route.path === child.to"
            >
              <Icon v-if="child.icon" :name="child.icon" class="w-5 h-5" />
              <p class="font-semibold text-[12px]">
                {{ child.label }}
              </p>
            </ULink>

            <div
              v-if="index === 0 && item.children.slice(2).length > 1"
              class="w-px h-4 bg-gray-300 mx-2"
            />
          </template>
        </div>
      </div>
    </template>

    <template #hospitality-content="{ item }">
      <div
        class="p-4 min-w-64"
        style="--reka-navigation-menu-viewport-width: auto"
      >
        <div class="flex transition-all duration-300 ease-in-out">
          <div class="flex flex-col space-y-2 flex-shrink-0">
            <template v-for="child in item.children" :key="child.label">
              <ULink
                :to="child.to || '#'"
                class="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-elevated/50 whitespace-nowrap"
                :exact="route.path === child.to"
                @mouseenter="hoveredItem = child"
                @mouseleave="hoveredItem = null"
              >
                <Icon
                  v-if="child.icon"
                  :name="child.icon"
                  class="w-5 h-5 text-primary-500 flex-shrink-0"
                />
                <p class="text-sm font-semibold">
                  {{ child.label }}
                </p>
              </ULink>
            </template>
          </div>

          <div
            class="transition-all duration-300 ease-in-out bg-gray-200 flex-shrink-0"
            :class="
              hoveredItem ? 'w-px opacity-100 mx-4' : 'w-0 opacity-0 mx-0'
            "
          />

          <div
            class="transition-all duration-300 ease-in-out flex-1 min-w-0"
            :class="hoveredItem ? 'opacity-100' : 'opacity-0'"
          >
            <div
              v-if="hoveredItem && hoveredItem.description"
              class="pr-4 w-44"
            >
              <p
                class="text-sm text-muted leading-relaxed whitespace-normal break-words"
              >
                {{ hoveredItem.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #retail-content="{ item }">
      <div class="p-4 overflow-hidden min-w-64">
        <div class="flex transition-all duration-300 ease-in-out">
          <div class="flex flex-col space-y-2 flex-shrink-0 min-w-0">
            <template v-for="child in item.children" :key="child.label">
              <ULink
                :to="child.to || '#'"
                class="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-elevated/50 whitespace-nowrap"
                :exact="route.path === child.to"
                @mouseenter="hoveredItem = child"
                @mouseleave="hoveredItem = null"
              >
                <Icon
                  v-if="child.icon"
                  :name="child.icon"
                  class="w-5 h-5 text-primary-500 flex-shrink-0"
                />
                <p class="text-sm font-semibold">
                  {{ child.label }}
                </p>
              </ULink>
            </template>
          </div>

          <div
            class="transition-all duration-300 ease-in-out bg-gray-200 flex-shrink-0"
            :class="
              hoveredItem ? 'w-px opacity-100 mx-4' : 'w-0 opacity-0 mx-0'
            "
          />

          <div
            class="transition-all duration-300 ease-in-out flex-1 min-w-0"
            :class="hoveredItem ? 'opacity-100' : 'opacity-0'"
          >
            <div
              v-if="hoveredItem && hoveredItem.description"
              class="pr-4 w-44"
            >
              <p
                class="text-sm text-muted leading-relaxed whitespace-normal break-words"
              >
                {{ hoveredItem.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </template>

    <template #about-content="{ item }">
      <div class="p-4 w-48">
        <ul class="space-y-1">
          <li v-for="child in item.children" :key="child.label">
            <ULink
              :to="child.to || '#'"
              class="block text-sm text-left rounded-md px-3 py-2 transition-colors hover:bg-elevated/50"
            >
              <p class="text-sm font-semibold">
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
const route = useRoute()

const props = defineProps({
  orientation: {
    type: String as PropType<'horizontal' | 'vertical'>,
    required: true
  }
})

const hoveredItem = ref<{
  label: string
  description?: string
  icon?: string
  to: string
} | null>(null)

const items = computed(() => [
  {
    label: t('ui.navigation.main.products'),
    class: 'font-bold',
    slot: 'products' as const,
    children: [
      {
        label: t('ui.navigation.products.forHospitality'),
        description: t('ui.navigation.main.hospitalityDesc'),
        to: localePath('/products/hospitality'),
        image: {
          src: '/images/features/hospitality.avif',
          alt: 'Hospitality products'
        }
      },
      {
        label: t('ui.navigation.products.forRetail'),
        description: t('ui.navigation.main.retailDesc'),
        to: localePath('/products/retail'),
        image: {
          src: '/images/features/retail.avif',
          alt: 'Retail products'
        }
      },
      {
        label: t('ui.navigation.products.bookDemo'),
        icon: 'i-lucide-calendar',
        to: localePath('/demo')
      },
      {
        label: t('ui.navigation.products.download'),
        icon: 'i-lucide-download',
        to: localePath('/products/download')
      },
      {
        label: t('ui.navigation.products.faqdocs'),
        icon: 'mi:document',
        to: localePath('/products/faqdocs')
      }
    ]
  },
  {
    label: t('ui.navigation.main.hospitality'),
    class: 'font-bold',
    slot: 'hospitality' as const,
    children: [
      {
        label: t('ui.navigation.categories.restaurants'),
        description: t('ui.navigation.categories.restaurantsDesc'),
        icon: 'i-lucide-utensils',
        to: localePath('/solutions/restaurants')
      },
      {
        label: t('ui.navigation.categories.barsCafes'),
        description: t('ui.navigation.categories.barsCafesDesc'),
        icon: 'i-lucide-coffee',
        to: localePath('/solutions/bars-cafes')
      },
      {
        label: t('ui.navigation.categories.fastFood'),
        description: t('ui.navigation.categories.fastFoodDesc'),
        icon: 'ion:fast-food-outline',
        to: localePath('/solutions/fast-food')
      }
    ]
  },
  {
    label: t('ui.navigation.main.retail'),
    class: 'font-bold',
    slot: 'retail' as const,
    children: [
      {
        label: t('ui.navigation.categories.grocerySupermarkets'),
        description: t('ui.navigation.categories.grocerySupermarketsDesc'),
        icon: 'i-lucide-shopping-cart',
        to: localePath('/solutions/grocery-supermarkets')
      },
      {
        label: t('ui.navigation.categories.clothingBoutiques'),
        description: t('ui.navigation.categories.clothingBoutiquesDesc'),
        icon: 'i-lucide-shirt',
        to: localePath('/solutions/clothing-boutiques')
      },
      {
        label: t('ui.navigation.categories.convenienceStores'),
        description: t('ui.navigation.categories.convenienceStoresDesc'),
        icon: 'i-lucide-store',
        to: localePath('/solutions/convenience-stores')
      },
      {
        label: t('ui.navigation.categories.b2b'),
        description: t('ui.navigation.categories.b2bDesc'),
        icon: 'i-lucide-building',
        to: localePath('/solutions/b2b')
      }
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
      { label: t('ui.navigation.about.contact'), to: localePath('/contact') },
      {
        label: t('ui.navigation.about.clientStories'),
        to: localePath('/client-stories')
      },
      { label: t('ui.navigation.about.partners'), to: localePath('/partners') }
    ]
  }
])
</script>
