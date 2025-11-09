<template>
  <section
    class="pt-34 relative isolate overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#8d5494_0%,_#563275_40%,_#1f1633_100%)]"
    :aria-label="t('pages.solutions.hero.title')"
  >
    <UContainer class="relative z-10 pb-12 sm:pb-24">
      <div class="flex flex-col items-center text-center">
        <!-- Tagline -->
        <UIAppear direction="up">
          <div class="mb-6 text-sm sm:text-base font-semibold px-3 py-2 bg-gradient-to-r from-[#C83852] via-[#B44092] to-[#6A5FC1] bg-[length:100%_100%] transition-all duration-300 text-white rounded-lg">
            {{ t('pages.solutions.hero.tagline') }}
          </div>
        </UIAppear>

        <!-- Main Headline -->
        <UIAppear direction="up">
          <h1 class="mb-6 text-4xl sm:text-6xl text-balance font-bold text-white">
            {{ t('pages.solutions.hero.title') }}
          </h1>
        </UIAppear>

        <!-- Subtitle -->
        <UIAppear direction="up">
          <p class="mb-8 text-xl text-balance max-w-3xl text-white">
            {{ t('pages.solutions.hero.subtitle') }}
          </p>
        </UIAppear>

        <!-- CTA Buttons -->
        <UIAppear direction="up">
          <div class="flex flex-wrap items-center justify-center gap-4 mb-12">
            <AppCTAButton variant="primary" section="hero" class="dark bg-white" size="xl" />
            <AppCTAButton variant="secondary" section="hero" class="dark" size="xl" />
          </div>
        </UIAppear>

        <!-- Solutions Grid - Simple & Clean -->
        <UIAppear direction="down" class="w-full max-w-6xl">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <NuxtLink
              v-for="solution in allSolutions"
              :key="solution.id"
              :to="solution.href"
              class="group relative rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 transition-all duration-300 hover:bg-white/20 hover:border-white/40 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/20 flex items-center gap-4"
            >
              <!-- Icon -->
              <div class="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 group-hover:rotate-6">
                <UIcon :name="solution.icon" class="w-6 h-6 text-white transition-transform duration-300 group-hover:scale-120" />
              </div>

              <!-- Title -->
              <h3 class="text-white text-lg font-semibold text-left transition-all duration-200 group-hover:translate-x-1">
                {{ solution.title }}
              </h3>
            </NuxtLink>
          </div>
        </UIAppear>
      </div>
    </UContainer>

    <!-- Wave Shape -->
    <div class="absolute left-0 right-0 -bottom-px w-full leading-[0] pointer-events-none">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 170"
        aria-hidden="true"
        class="fill-[var(--ui-bg)]"
      >
        <path
          fill-opacity="1"
          d="M0,160L120,160C240,160,480,160,720,138.7C960,117,1200,75,1320,53.3L1440,32L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
        />
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

// All solutions in order with Lucide icons
const solutionsList = [
  {
    "id": "restaurants",
    "icon": "i-lucide-utensils",
    "href": "/solutions/restaurants"
  },
  {
    "id": "barsCafes",
    "icon": "i-lucide-coffee",
    "href": "/solutions/bars-cafes"
  },
  {
    "id": "fastFood",
    "icon": "i-lucide-pizza",
    "href": "/solutions/fast-food"
  },
  {
    "id": "grocerySupermarkets",
    "icon": "i-lucide-shopping-cart",
    "href": "/solutions/grocery-supermarkets"
  },
  {
    "id": "clothingBoutiques",
    "icon": "i-lucide-shirt",
    "href": "/solutions/clothing-boutiques"
  },
  {
    "id": "convenienceStores",
    "icon": "i-lucide-store",
    "href": "/solutions/convenience-stores"
  },
  {
    "id": "b2b",
    "icon": "i-lucide-briefcase",
    "href": "/solutions/b2b"
  }
]

const allSolutions = solutionsList.map(s => ({
  ...s,
  title: t(`ui.navigation.categories.${s.id}`),
  href: localePath(s.href)
}))
</script>
