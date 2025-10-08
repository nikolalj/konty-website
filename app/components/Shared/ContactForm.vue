<template>
  <SharedSection
    :variant="props.variant"
    :title="t('ui.contactForm.title')"
    :description="t('ui.contactForm.description')"
    :rounded="true"
  >
    <div class="flex justify-center">
      <div class="px-8 pb-8 pt-0 rounded-2xl max-w-3xl w-full">
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
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.phone') }}
            </label>
            <UInput
              id="phone"
              v-model="form.phone"
              class="w-full"
              type="tel"
              :placeholder="t('ui.forms.placeholders.phone')"
              size="xl"
              required
            />
          </div>

          <div>
            <label for="industry" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.industry') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <USelect
              id="industry"
              v-model="form.industry"
              :items="industryOptions"
              class="w-full"
              size="xl"
            />
          </div>

          <div>
            <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.message') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <UTextarea
              id="message"
              v-model="form.message"
              class="w-full"
              :placeholder="t('ui.forms.placeholders.message')"
              :rows="5"
              size="xl"
            />
          </div>

          <div>
            <label for="preferredDateTime" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              {{ t('ui.forms.fields.preferredDateTime') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <UInput
              id="preferredDateTime"
              v-model="form.preferredDateTime"
              class="w-full"
              :placeholder="t('ui.forms.placeholders.preferredDateTime')"
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
    type: String as PropType<SectionVariantType>,
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
  phone: '',
  industry: '',
  message: '',
  preferredDateTime: ''
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true

  // Track general contact form submission with industry
  track('contact_form_submission', {
    industry: form.industry
  })

  // TODO: Implement actual form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}
</script>
