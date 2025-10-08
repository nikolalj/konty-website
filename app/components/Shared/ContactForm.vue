<template>
  <!-- Demo variant - compact form without section wrapper -->
  <div v-if="props.variant === 'demo'" class="w-full">
    <form class="space-y-4" @submit.prevent="onSubmit">
      <div>
        <label for="demo-name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {{ t('ui.forms.fields.name') }}
        </label>
        <UInput
          id="demo-name"
          v-model="form.name"
          class="w-full"
          :placeholder="t('ui.forms.placeholders.name')"
          size="lg"
          required
        />
      </div>

      <div>
        <label for="demo-email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {{ t('ui.forms.fields.email') }}
        </label>
        <UInput
          id="demo-email"
          v-model="form.email"
          class="w-full"
          type="email"
          :placeholder="t('ui.forms.placeholders.email')"
          size="lg"
          required
        />
      </div>

      <div>
        <label for="demo-phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {{ t('ui.forms.fields.phone') }}
        </label>
        <UInput
          id="demo-phone"
          v-model="form.phone"
          class="w-full"
          type="tel"
          :placeholder="t('ui.forms.placeholders.phone')"
          size="lg"
          required
        />
      </div>

      <div>
        <label for="demo-datetime" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {{ t('ui.forms.fields.preferredDateTime') }}
        </label>
        <UInput
          id="demo-datetime"
          v-model="form.preferredDateTime"
          class="w-full"
          :placeholder="t('ui.forms.placeholders.preferredDateTime')"
          size="lg"
        />
      </div>

      <div>
        <label for="demo-industry" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
          {{ t('ui.forms.fields.industry') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
        </label>
        <USelect
          id="demo-industry"
          v-model="form.industry"
          :options="industryOptions"
          class="w-full"
          size="lg"
        />
      </div>

      <UButton
        type="submit"
        color="primary"
        class="text-center font-semibold"
        size="lg"
        block
        :loading="loading"
      >
        {{ t('ui.forms.buttons.bookDemo') }}
      </UButton>
    </form>
  </div>

  <!-- Default/Alt variants - standard contact form with section wrapper -->
  <SharedSection
    v-else
    :variant="props.variant"
    :title="t('ui.contactForm.title')"
    :description="t('ui.contactForm.description')"
    :rounded="true"
  >
    <div class="flex justify-center">
      <div class="p-8 rounded-2xl max-w-3xl w-full">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.name') }}
            </label>
            <UInput
              id="name"
              v-model="form.name"
              class="w-full"
              :placeholder="t('ui.forms.placeholders.name')"
              size="xl"
              required
            />
          </div>

          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.email') }}
            </label>
            <UInput
              id="email"
              v-model="form.email"
              class="w-full"
              type="email"
              :placeholder="t('ui.forms.placeholders.email')"
              size="xl"
              required
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.message') }}
            </label>
            <UTextarea
              id="message"
              v-model="form.message"
              class="w-full"
              :placeholder="t('ui.forms.placeholders.message')"
              :rows="5"
              size="xl"
              required
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
            {{ t('ui.forms.buttons.submit') }}
          </UButton>
        </form>
      </div>
    </div>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType | 'demo'>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})

const { t } = useI18n()
const { track } = useTracking()

const form = reactive({
  name: '',
  email: '',
  message: '',
  phone: '',
  preferredDateTime: '',
  industry: ''
})

const industryOptions = computed(() => [
  { label: t('ui.forms.industryOptions.select'), value: '' },
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true

  const route = useRoute()
  const isDemoPage = route.path.includes('/demo')

  // Track form submission based on context
  if (isDemoPage) {
    track('book_a_demo_form')
  } else {
    // Track general contact form submission
    track('contact_form_submission')
  }

  // TODO: Implement actual form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}
</script>
