<template>
  <footer class="bg-[var(--ui-bg-alt)] py-4 lg:py-10">
    <section class="sm:py-9 w-full">
      <UContainer>
        <!-- Desktop: Grid Layout -->
        <div class="hidden md:grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="column in columns" :key="column.label" class="space-y-3">
            <h3 class="font-semibold text-sm text-gray-900 dark:text-white">
              {{ column.label }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in column.children" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>

        <!-- Mobile: Accordion Layout -->
        <div v-if="mobileLayout === 'accordion'" class="md:hidden space-y-2">
          <div
            v-for="(column, index) in columns"
            :key="column.label"
            class="border-b border-gray-200 dark:border-gray-700"
          >
            <button
              class="w-full flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              @click="toggleAccordion(index)"
            >
              <span class="font-semibold text-sm text-gray-900 dark:text-white">
                {{ column.label }}
              </span>
              <UIcon
                name="i-heroicons-chevron-down"
                class="w-5 h-5 transition-transform duration-200 text-gray-500"
                :class="[
                  openAccordions.includes(index) && 'transform rotate-180'
                ]"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-200 ease-out"
              enter-from-class="max-h-0 opacity-0"
              enter-to-class="max-h-96 opacity-100"
              leave-active-class="transition-all duration-200 ease-in"
              leave-from-class="max-h-96 opacity-100"
              leave-to-class="max-h-0 opacity-0"
            >
              <ul
                v-show="openAccordions.includes(index)"
                class="space-y-2 pb-4 px-3 overflow-hidden"
              >
                <li v-for="link in column.children" :key="link.label">
                  <NuxtLink
                    :to="link.to"
                    class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block py-1"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </ul>
            </Transition>
          </div>
        </div>

        <!-- Mobile: List Layout -->
        <div v-else class="md:hidden space-y-6">
          <div v-for="column in columns" :key="column.label" class="space-y-3">
            <h3 class="font-semibold text-sm text-gray-900 dark:text-white">
              {{ column.label }}
            </h3>
            <ul class="space-y-2">
              <li v-for="link in column.children" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors block"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </UContainer>
    </section>

    <section>
      <UContainer class="py-4 lg:py-10">
        <div
          class="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:items-center"
        >
          <!-- CTA Buttons -->
          <div class="flex gap-3 justify-center lg:justify-start mt-4 lg:mt-0">
            <AppCTAButton
              variant="primary"
              size="lg"
              section="footer"
              icon-position="trailing"
              custom-class="w-full xl:min-w-44 justify-between"
            />
            <AppCTAButton
              variant="secondary"
              size="lg"
              section="footer"
              icon-position="trailing"
              custom-class="w-full xl:min-w-44 justify-between"
            />
          </div>

          <!-- Newsletter Input -->
          <div class="w-full">
            <UInput
              v-model="newsletterEmail"
              type="email"
              :placeholder="t('ui.footer.newsletter.emailPlaceholder')"
              leading-icon="i-heroicons-envelope"
              class="w-full my-4 xl:my-0"
              size="xl"
              @keyup.enter="handleNewsletterSubmit"
            >
              <template #trailing>
                <UButton
                  type="submit"
                  size="xs"
                  color="neutral"
                  :label="t('ui.footer.newsletter.subscribe')"
                  @click="handleNewsletterSubmit"
                />
              </template>
            </UInput>
          </div>

          <!-- Legal Links -->
          <div
            class="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 justify-center lg:justify-end"
          >
            <NuxtLink
              :to="localePath('/privacy')"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors whitespace-nowrap"
            >
              {{ t('ui.footer.links.privacy') }}
            </NuxtLink>
            <span>•</span>
            <NuxtLink
              :to="localePath('/terms')"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors whitespace-nowrap"
            >
              {{ t('ui.footer.links.terms') }}
            </NuxtLink>
            <span>•</span>
            <NuxtLink
              :to="localePath('/privacy')"
              class="hover:text-gray-900 dark:hover:text-gray-100 transition-colors whitespace-nowrap"
            >
              {{ t('ui.footer.links.dpa') }}
            </NuxtLink>
          </div>
        </div>
      </UContainer>
    </section>
  </footer>
</template>

<script setup lang="ts">
interface FooterLink {
  label: string
  to: string
}

interface FooterColumn {
  label: string
  children: FooterLink[]
}

interface Props {
  mobileLayout?: 'accordion' | 'list'
}

withDefaults(defineProps<Props>(), {
  mobileLayout: 'accordion'
})

const { t } = useI18n()
const localePath = useLocalePath()
const { track } = useTracking()

const newsletterEmail = ref('')
const openAccordions = ref<number[]>([])

const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    track('newsletter_subscription')
    // TODO: Implement actual newsletter subscription
    newsletterEmail.value = ''
  }
}

const toggleAccordion = (index: number) => {
  const accordionIndex = openAccordions.value.indexOf(index)
  if (accordionIndex > -1) {
    openAccordions.value.splice(accordionIndex, 1)
  } else {
    openAccordions.value.push(index)
  }
}

const columns: FooterColumn[] = [
  {
    label: t('ui.footer.links.products'),
    children: [
      {
        label: t('ui.navigation.products.forHospitality'),
        to: localePath('/products/hospitality')
      },
      {
        label: t('ui.navigation.products.forRetail'),
        to: localePath('/products/retail')
      },
      { label: t('ui.navigation.main.pricing'), to: localePath('/pricing') },
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
    label: t('ui.footer.hospitalitySolutions.title'),
    children: [
      {
        label: t('ui.footer.hospitalitySolutions.restaurants'),
        to: localePath('/solutions/restaurants')
      },
      {
        label: t('ui.footer.hospitalitySolutions.cafes'),
        to: localePath('/solutions/bars-cafes')
      },
      {
        label: t('ui.footer.hospitalitySolutions.bars'),
        to: localePath('/solutions/bars-cafes')
      },
      {
        label: t('ui.footer.hospitalitySolutions.pizzerias'),
        to: localePath('/solutions/restaurants')
      }
    ]
  },
  {
    label: t('ui.footer.retailSolutions.title'),
    children: [
      {
        label: t('ui.footer.retailSolutions.grocery'),
        to: localePath('/solutions/grocery-supermarkets')
      },
      {
        label: t('ui.footer.retailSolutions.supermarkets'),
        to: localePath('/solutions/grocery-supermarkets')
      },
      {
        label: t('ui.footer.retailSolutions.clothing'),
        to: localePath('/solutions/clothing-boutiques')
      },
      {
        label: t('ui.footer.retailSolutions.convenience'),
        to: localePath('/solutions/convenience-stores')
      }
    ]
  },
  {
    label: t('ui.footer.about.title'),
    children: [
      { label: t('ui.footer.about.contact'), to: localePath('/contact') },
      {
        label: t('ui.footer.about.clients'),
        to: localePath('/client-stories')
      },
      { label: t('ui.footer.about.partners'), to: localePath('/partners') },
      { label: t('ui.footer.about.careers'), to: localePath('/contact') },
      { label: t('ui.footer.about.blog'), to: localePath('/blog') }
    ]
  }
]
</script>
