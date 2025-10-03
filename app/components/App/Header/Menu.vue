<template>
  <div
    v-if="props.orientation === 'horizontal'"
    class="flex items-center space-x-2"
  >
    <template v-for="item in items" :key="item.label">
      <!-- Dropdown item with children -->
      <div v-if="item.children && item.children.length > 0" class="relative">
        <UPopover
          v-model:open="openStates[item.label]"
          mode="hover"
          :content="{
            align: 'start',
            side: 'bottom',
            sideOffset: 8
          }"
        >
          <template #default="{ open }">
            <UButton
              :label="item.label"
              :trailing-icon="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
              variant="ghost"
              :aria-expanded="open"
              class="group border-none text-base text-white hover:text-gray-300 font-bold transition-colors"
              :class="open ? 'text-gray-200' : ''"
            />
          </template>

          <template #content>
            <!-- Products content -->
            <div v-if="item.slot === 'products'" class="p-4 space-y-4">
              <div class="grid grid-cols-2 gap-4 mb-6">
                <template
                  v-for="child in item.children.slice(0, 2)"
                  :key="child.label"
                >
                  <ULink
                    :to="child.to || '#'"
                    class="relative group block overflow-hidden aspect-[4/3]"
                    :exact="route.path === child.to"
                    @click="handleNavigate"
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

                    <div class="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                    <div class="absolute inset-0 flex items-end justify-center pb-3 px-3">
                      <p class="text-white text-sm font-bold text-center leading-tight line-clamp-2">
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
                    @click="handleNavigate"
                  >
                    <Icon
                      v-if="child.icon"
                      :name="child.icon"
                      class="w-5 h-5 text-primary flex-shrink-0"
                    />
                    <p class="font-semibold text-sm">
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

            <!-- Hospitality and retail content -->
            <div
              v-else-if="item.slot === 'hospitality' || item.slot === 'retail'"
              class="p-4 min-w-64"
              @mouseleave="openStates[item.label] = false"
            >
              <div
                class="flex transition-all duration-300 ease-in-out"
                @mouseleave="resetDescription"
              >
                <div class="flex flex-col space-y-2 flex-shrink-0">
                  <template v-for="child in item.children" :key="child.label">
                    <ULink
                      :to="child.to || '#'"
                      class="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-elevated/50 whitespace-nowrap"
                      :exact="route.path === child.to"
                      @mouseenter="hoveredItem = child"
                      @click="handleNavigate"
                    >
                      <Icon
                        v-if="child.icon"
                        :name="child.icon"
                        class="w-5 h-5 text-primary flex-shrink-0"
                      />
                      <p class="text-sm font-semibold">
                        {{ child.label }}
                      </p>
                    </ULink>
                  </template>
                </div>

                <div
                  class="transition-all duration-300 ease-in-out bg-gray-200 flex-shrink-0"
                  :class="hoveredItem ? 'w-px opacity-100 mx-4' : 'w-0 opacity-0 mx-0'"
                />

                <div
                  class="transition-all duration-300 ease-in-out flex-1 min-w-0"
                  :class="hoveredItem || lastHoveredItem ? 'opacity-100' : 'opacity-0'"
                >
                  <div
                    v-if="
                      (hoveredItem || lastHoveredItem) &&
                      (hoveredItem?.description || lastHoveredItem?.description)
                    "
                    class="pr-4 w-44"
                  >
                    <p class="text-sm leading-relaxed whitespace-normal break-words">
                      {{ hoveredItem?.description || lastHoveredItem?.description }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- About content -->
            <div v-else-if="item.slot === 'about'" class="p-4">
              <ul class="space-y-1">
                <li v-for="child in item.children" :key="child.label">
                  <ULink
                    :to="child.to || '#'"
                    class="flex items-center space-x-3 px-4 py-3 rounded-md transition-colors hover:bg-elevated/50 whitespace-nowrap"
                    @click="handleNavigate"
                  >
                    <Icon
                      v-if="child.icon"
                      :name="child.icon"
                      class="w-5 h-5 text-primary flex-shrink-0"
                    />
                    <p class="text-sm font-semibold">
                      {{ child.label }}
                    </p>
                  </ULink>
                </li>
              </ul>
            </div>
          </template>
        </UPopover>
      </div>

      <UButton
        v-else
        :to="item.to || '#'"
        :label="item.label"
        variant="ghost"
        class="group text-base text-white hover:text-gray-300 font-bold transition-colors"
        :class="route.path === item.to ? 'text-gray-200' : ''"
        :aria-current="route.path === item.to ? 'page' : undefined"
        @click="handleNavigate"
      />
    </template>
  </div>

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

interface BaseMenuItem {
  label: string
  to?: string
  icon?: string
  description?: string
  image?: { src: string; alt?: string }
}

interface MenuGroup extends BaseMenuItem {
  slot?: 'products' | 'hospitality' | 'retail' | 'about'
  children?: BaseMenuItem[]
  class?: string
}

const hoveredItem = ref<BaseMenuItem | null>(null)
const lastHoveredItem = ref<BaseMenuItem | null>(null)
const openStates = reactive<Record<string, boolean>>({})

watch(hoveredItem, (val) => {
  if (val) {
    lastHoveredItem.value = val
  }
})

function resetDescription() {
  hoveredItem.value = null
  lastHoveredItem.value = null
}

function closeAll() {
  for (const key in openStates) openStates[key] = false
  resetDescription()
}

function handleNavigate() {
  closeAll()
}

watch(
  () => route.fullPath,
  () => {
    closeAll()
  }
)

const anyOpen = computed(() => Object.values(openStates).some(Boolean))
watch(anyOpen, (isOpen, wasOpen) => {
  if (!isOpen && wasOpen) {
    resetDescription()
  }
})

const items = computed<MenuGroup[]>(() => [
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
        },
        icon: 'i-lucide-coffee'
      },
      {
        label: t('ui.navigation.products.forRetail'),
        description: t('ui.navigation.main.retailDesc'),
        to: localePath('/products/retail'),
        image: { src: '/images/features/retail.avif', alt: 'Retail products' },
        icon: 'i-lucide-shopping-cart'
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
        icon: 'i-lucide-file-text',
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
      {
        label: t('ui.navigation.about.contact'),
        to: localePath('/contact'),
        icon: 'i-lucide-phone',
      },
      {
        label: t('ui.navigation.about.clientStories'),
        to: localePath('/client-stories'),
        icon: 'i-lucide-users',
      },
      {
        label: t('ui.navigation.about.partners'),
        to: localePath('/partners'),
        icon: 'i-lucide-building-2',
      }
    ]
  }
])
</script>
