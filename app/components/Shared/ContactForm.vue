<template>
  <SharedSection
    :variant="props.variant"
    :title="t('ui.contactForm.title')"
    :description="t('ui.contactForm.description')"
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
  message: ''
})

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
