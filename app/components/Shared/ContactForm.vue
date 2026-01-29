<template>
  <SharedSection
    ref="contactFormSection"
    :variant="props.variant"
    :title="t('ui.contactForm.title')"
    :description="t('ui.contactForm.description')"
    :subtitle="t('ui.contactForm.subtitle')"
    :rounded="true"
  >
    <div class="flex justify-center">
      <div class="px-8 pb-8 pt-0 rounded-2xl max-w-3xl w-full">
        <form class="space-y-6" @submit.prevent="onSubmit">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.name') }}
            </label>
            <UInput
              id="name"
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
              for="email"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.email') }}
            </label>
            <UInput
              id="email"
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
              for="phone"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.phone') }}
            </label>
            <UInput
              id="phone"
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
              for="industry"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.industry') }}
              <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
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
            <label
              for="subscription"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.subscription') }}
              <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <USelect
              id="subscription"
              v-model="form.subscription"
              :items="subscriptionOptions"
              class="w-full"
              size="xl"
            />
          </div>

          <div>
            <label
              for="message"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.message') }}
              <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
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
            <label
              for="preferredDateTime"
              class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
            >
              {{ t('ui.forms.fields.preferredDateTime') }}
              <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
            </label>
            <UPopover>
              <UButton
                id="preferredDateTime"
                color="neutral"
                variant="outline"
                icon="i-lucide-calendar"
                size="xl"
                class="w-full justify-start text-left font-normal"
                :class="{
                  'text-gray-400 dark:text-gray-500':
                    !selectedDate || !selectedTime
                }"
              >
                {{ displayDateTime }}
              </UButton>

              <template #content>
                <div class="p-4 space-y-4">
                  <UCalendar
                    v-model="selectedDate"
                    :min-value="minDate"
                    :is-date-unavailable="isDateUnavailable"
                  />
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      {{ t('ui.forms.fields.time') }}
                    </label>
                    <USelect
                      v-model="selectedTime"
                      :items="availableTimeSlots"
                      :disabled="
                        !selectedDate || availableTimeSlots.length === 0
                      "
                      size="lg"
                      class="w-full"
                    />
                    <p
                      v-if="selectedDate && availableTimeSlots.length === 0"
                      class="text-sm text-amber-600 dark:text-amber-400"
                    >
                      {{ t('ui.forms.noAvailableSlots') }}
                    </p>
                    <p
                      v-if="availabilityError"
                      class="text-sm text-amber-600 dark:text-amber-400"
                    >
                      {{ availabilityError }}
                    </p>
                  </div>
                </div>
              </template>
            </UPopover>
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
    default: undefined
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  }
})

const { t } = useI18n()
const { track } = useTracking()
const toast = useToast()
const { selectedSubscription } = usePricingContactForm()

// Use HubSpot meetings composable
const {
  selectedDate,
  selectedTime,
  minDate,
  availableTimeSlots,
  displayDateTime,
  availabilityError,
  fetchAvailability,
  isDateUnavailable,
  getPreferredDateTimeISO,
  getSelectedSlotDetails,
  resetDateTime
} = useHubspotMeetings()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  industry: '',
  message: '',
  subscription: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: ''
})

onMounted(() => {
  fetchAvailability()

  // Listen for pricing plan selection event
  const handlePricingPlanSelected = (event: CustomEvent) => {
    const subscription = event.detail?.subscription
    const industry = event.detail?.industry

    if (subscription) {
      form.subscription = subscription
    }

    if (industry) {
      form.industry = industry
    }

    // Scroll to this form if subscription was selected
    if (subscription) {
      scrollToForm()
    }
  }

  window.addEventListener(
    'pricing-plan-selected',
    handlePricingPlanSelected as EventListener
  )

  // Also check if there's a pre-selected subscription from state
  if (selectedSubscription.value) {
    form.subscription = selectedSubscription.value
  }
})

onUnmounted(() => {
  window.removeEventListener('pricing-plan-selected', () => {})
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const subscriptionOptions = ref([
  {
    label: t('ui.forms.subscriptionOptions.hospitality_start'),
    value: 'hospitality_start'
  },
  {
    label: t('ui.forms.subscriptionOptions.hospitality_standard'),
    value: 'hospitality_standard'
  },
  {
    label: t('ui.forms.subscriptionOptions.hospitality_premium'),
    value: 'hospitality_premium'
  },
  {
    label: t('ui.forms.subscriptionOptions.retail_start'),
    value: 'retail_start'
  },
  {
    label: t('ui.forms.subscriptionOptions.retail_standard'),
    value: 'retail_standard'
  },
  {
    label: t('ui.forms.subscriptionOptions.retail_premium'),
    value: 'retail_premium'
  }
])

const loading = ref(false)

// Validation functions
const validateName = () => {
  if (!form.name.trim()) {
    errors.name = t('ui.forms.errors.nameRequired')
    return false
  }
  errors.name = ''
  return true
}

const validateEmail = () => {
  if (!form.email.trim()) {
    errors.email = t('ui.forms.errors.emailRequired')
    return false
  }
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    errors.email = t('ui.forms.errors.emailInvalid')
    return false
  }
  errors.email = ''
  return true
}

const validatePhone = () => {
  if (!form.phone.trim()) {
    errors.phone = t('ui.forms.errors.phoneRequired')
    return false
  }

  // Phone validation - accept different formats:
  // +381 60 123 4567, +387 60 123 456, 060-123-4567, itd.
  const phoneRegex = /^[\d\s\-+()]{8,20}$/
  const digitsOnly = form.phone.replace(/[\s\-+()]/g, '')

  if (!phoneRegex.test(form.phone) || digitsOnly.length < 8) {
    errors.phone = t('ui.forms.errors.phoneInvalid')
    return false
  }

  errors.phone = ''
  return true
}

const validateForm = () => {
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPhoneValid = validatePhone()

  return isNameValid && isEmailValid && isPhoneValid
}

// Reset form to initial state
const resetForm = () => {
  form.name = ''
  form.email = ''
  form.phone = ''
  form.industry = ''
  form.message = ''
  form.subscription = ''
  resetDateTime()
  errors.name = ''
  errors.email = ''
  errors.phone = ''
}

const onSubmit = async () => {
  // Validate form before submission
  if (!validateForm()) {
    return
  }

  loading.value = true

  try {
    // Use composable method to get ISO datetime
    const preferredDateTime = getPreferredDateTimeISO()
    const slotDetails = getSelectedSlotDetails()

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        message: form.message,
        subscription: form.subscription,
        preferredDateTime,
        startTime: slotDetails?.startTime,
        endTime: slotDetails?.endTime,
        meetingDurationMs: slotDetails?.durationMs,
        meetingTimezone: slotDetails?.timezone,
        likelyAvailableUserIds: slotDetails?.likelyAvailableUserIds
      }
    })

    // Track successful form submission
    track('contact_form_submission', {
      industry: form.industry,
      hasPreferredDateTime: !!preferredDateTime,
      meetingScheduled: !!slotDetails?.startTime
    })

    toast.add({
      title: t('ui.forms.messages.success'),
      description: t('ui.forms.messages.successDescription'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })

    resetForm()
  } catch (error) {
    // Show error notification
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

// Ref to the section element
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const contactFormSection = ref<any>(null)

// Function to scroll to this form
const scrollToForm = () => {
  if (contactFormSection.value) {
    const element = contactFormSection.value.$el || contactFormSection.value
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
</script>
