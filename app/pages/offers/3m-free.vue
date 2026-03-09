<template>
  <div>
    <!-- Campaign Hero -->
    <section
      class="pt-34 pb-20 relative isolate overflow-hidden flex items-center justify-center bg-[radial-gradient(ellipse_at_center,_#8d5494_0%,_#563275_40%,_#1f1633_100%)]"
    >
      <UContainer class="relative z-10">
        <div class="flex flex-col items-center text-center">
          <!-- Badge -->
          <UIAppear direction="up">
            <div class="mb-6 text-sm sm:text-base font-semibold px-3 py-2 bg-gradient-to-r from-[#C83852] via-[#B44092] to-[#6A5FC1] text-white rounded-lg">
              {{ t('pages.offers.3mFree.hero.badge') }}
            </div>
          </UIAppear>

          <!-- Main Headline -->
          <UIAppear direction="up">
            <h1 class="mb-6 text-4xl sm:text-6xl text-balance font-bold text-white">
              {{ t('pages.offers.3mFree.hero.title') }}
            </h1>
          </UIAppear>

          <!-- Subtitle -->
          <UIAppear direction="up">
            <p class="mb-8 text-xl text-balance max-w-3xl text-white/90">
              {{ t('pages.offers.3mFree.hero.subtitle') }}
            </p>
          </UIAppear>

          <!-- CTA -->
          <UIAppear direction="up">
            <UButton
              size="xl"
              variant="solid"
              class="font-semibold dark bg-white hover:bg-secondary"
              icon="i-lucide-arrow-down"
              @click="scrollToForm"
            >
              {{ t('pages.offers.3mFree.hero.cta') }}
            </UButton>
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

    <!-- How It Works -->
    <section class="py-16">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-4">
            {{ t('pages.offers.3mFree.howItWorks.title') }}
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div
            v-for="(step, index) in steps"
            :key="index"
            class="text-center"
          >
            <div class="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
              <span class="text-xl font-bold text-primary">{{ index + 1 }}</span>
            </div>
            <h3 class="text-lg font-semibold mb-2">{{ step.title }}</h3>
            <p class="text-sm text-[var(--ui-text-muted)]">{{ step.description }}</p>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Contact Form -->
    <section class="py-16">
      <UContainer>
        <div class="flex justify-center">
          <div class="max-w-lg w-full">
            <h2 class="text-3xl font-bold mb-2 text-center">
              {{ t('pages.offers.3mFree.form.title') }}
            </h2>
            <p class="text-[var(--ui-text-muted)] mb-8 text-center">
              {{ t('pages.offers.3mFree.form.description') }}
            </p>

            <form class="space-y-4" @submit.prevent="onSubmit">
              <div>
                <label
                  for="promo-name"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  {{ t('ui.forms.fields.name') }}
                </label>
                <UInput
                  id="promo-name"
                  v-model="form.name"
                  class="w-full"
                  :placeholder="t('ui.forms.placeholders.name')"
                  size="xl"
                  :error="!!errors.name"
                  @blur="validateName"
                />
                <p
                  v-if="errors.name"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.name }}
                </p>
              </div>

              <div>
                <label
                  for="promo-phone"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  {{ t('ui.forms.fields.phone') }}
                </label>
                <UInput
                  id="promo-phone"
                  v-model="form.phone"
                  class="w-full"
                  type="tel"
                  :placeholder="t('ui.forms.placeholders.phone')"
                  size="xl"
                  :error="!!errors.phone"
                  @blur="validatePhone"
                />
                <p
                  v-if="errors.phone"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.phone }}
                </p>
              </div>

              <div>
                <label
                  for="promo-email"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  {{ t('ui.forms.fields.email') }}
                  <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
                </label>
                <UInput
                  id="promo-email"
                  v-model="form.email"
                  class="w-full"
                  type="email"
                  :placeholder="t('ui.forms.placeholders.email')"
                  size="xl"
                  :error="!!errors.email"
                  @blur="validateEmail"
                />
                <p
                  v-if="errors.email"
                  class="mt-1 text-sm text-red-600 dark:text-red-400"
                >
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label
                  for="promo-industry"
                  class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
                >
                  {{ t('ui.forms.fields.industry') }}
                  <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
                </label>
                <USelect
                  id="promo-industry"
                  v-model="form.industry"
                  :items="industryOptions"
                  class="w-full"
                  size="xl"
                />
              </div>

              <UButton
                type="submit"
                color="primary"
                class="text-center font-semibold"
                size="xl"
                block
                :loading="loading"
              >
                {{ t('pages.offers.3mFree.form.button') }}
              </UButton>
            </form>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Pricing -->
    <LazySharedPricing variant="alt" hydrate-on-visible />

    <!-- Terms -->
    <div class="pb-8 text-center">
      <p class="text-xs text-[var(--ui-text-muted)]">
        {{ t('pages.offers.3mFree.terms') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { track } = useTracking()
const toast = useToast()

usePageSeo({
  title: t('seo.offers.3mFree.title'),
  description: t('seo.offers.3mFree.description')
})

defineOgImageComponent('Main', {
  title: t('pages.offers.3mFree.hero.title'),
  description: t('pages.offers.3mFree.hero.subtitle'),
  badge: t('pages.offers.3mFree.hero.badge'),
  cta: t('pages.offers.3mFree.hero.cta')
})

const { tDeep } = useUtils()

const steps = computed(() => {
  return tDeep<Array<{ title: string, description: string }>>('pages.offers.3mFree.howItWorks.steps')
})

const form = reactive({
  name: '',
  phone: '',
  email: '',
  industry: 'hospitality'
})

const errors = reactive({
  name: '',
  phone: '',
  email: ''
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const loading = ref(false)

const validateName = () => {
  if (!form.name.trim()) {
    errors.name = t('ui.forms.errors.nameRequired')
    return false
  }
  errors.name = ''
  return true
}

const validatePhone = () => {
  if (!form.phone.trim()) {
    errors.phone = t('ui.forms.errors.phoneRequired')
    return false
  }
  const phoneRegex = /^[\d\s\-+()]{8,20}$/
  const digitsOnly = form.phone.replace(/[\s\-+()]/g, '')
  if (!phoneRegex.test(form.phone) || digitsOnly.length < 8) {
    errors.phone = t('ui.forms.errors.phoneInvalid')
    return false
  }
  errors.phone = ''
  return true
}

const validateEmail = () => {
  if (!form.email.trim()) {
    errors.email = ''
    return true
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = t('ui.forms.errors.emailInvalid')
    return false
  }
  errors.email = ''
  return true
}

const validateForm = () => {
  const isNameValid = validateName()
  const isPhoneValid = validatePhone()
  const isEmailValid = validateEmail()
  return isNameValid && isPhoneValid && isEmailValid
}

const onSubmit = async () => {
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        email: form.email || undefined,
        industry: form.industry,
        message: '3 mjeseca besplatno - sajam ugostiteljstva'
      }
    })

    track('3m_free_form_submission', {
      industry: form.industry,
      hasEmail: !!form.email
    })

    toast.add({
      title: t('ui.forms.messages.success'),
      description: t('ui.forms.messages.successDescription'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    form.name = ''
    form.phone = ''
    form.email = ''
    form.industry = 'hospitality'
    errors.name = ''
    errors.phone = ''
    errors.email = ''
  } catch (error) {
    const errorMessage =
      error && typeof error === 'object' && 'data' in error
        ? (error.data as { statusMessage?: string })?.statusMessage
        : undefined

    toast.add({
      title: t('ui.forms.messages.error'),
      description: errorMessage || t('ui.forms.messages.errorDescription'),
      color: 'error',
      icon: 'i-lucide-alert-circle'
    })
  } finally {
    loading.value = false
  }
}

function scrollToForm() {
  document.querySelector('form')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>
