<template>
  <SharedSection
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
                  <UCalendar v-model="selectedDate" :min-value="minDate" />
                  <div class="space-y-2">
                    <label
                      class="block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                      {{ t('ui.forms.fields.time') }}
                    </label>
                    <USelect
                      v-model="selectedTime"
                      :items="timeOptions"
                      size="lg"
                      class="w-full"
                    />
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
import { DateFormatter, getLocalTimeZone, today } from '@internationalized/date'
import { LOCALES } from '~/config/locale.config.mjs'

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

const { t, locale } = useI18n()
const { track } = useTracking()
const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  industry: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  phone: ''
})

const selectedDate = ref()
const selectedTime = ref('')

// Set minimum date to today
const minDate = today(getLocalTimeZone())

// Get current locale configuration
const currentLocale = computed(() =>
  LOCALES.find((l) => l.code === locale.value)
)

// Date formatter - locale-aware using locale config
const df = computed(() => {
  return new DateFormatter(currentLocale.value?.iso || 'en-US', {
    dateStyle: 'medium'
  })
})

// Generate time options (9 AM to 5 PM in 30-minute intervals)
const timeOptions = computed(() => {
  const uses12Hour = currentLocale.value?.uses12HourFormat ?? false

  const options = []
  for (let hour = 9; hour <= 17; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      if (hour === 17 && minute > 0) break // Stop at 5:00 PM (17:00)
      const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

      let displayTime
      if (uses12Hour) {
        // 12-hour format with AM/PM
        const period = hour >= 12 ? 'PM' : 'AM'
        const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour
        displayTime = `${displayHour}:${minute.toString().padStart(2, '0')} ${period}`
      } else {
        // 24-hour format
        displayTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      }

      options.push({ label: displayTime, value: timeString })
    }
  }
  return options
})

// Display formatted date and time
const displayDateTime = computed(() => {
  if (!selectedDate.value) {
    return t('ui.forms.placeholders.preferredDateTime')
  }

  const dateStr = df.value.format(selectedDate.value.toDate(getLocalTimeZone()))

  if (!selectedTime.value) {
    return dateStr
  }

  const timeOption = timeOptions.value.find(
    (opt) => opt.value === selectedTime.value
  )
  const separator = currentLocale.value?.dateTimeSeparator || 'at'
  return `${dateStr} ${separator} ${timeOption?.label || selectedTime.value}`
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
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
  selectedDate.value = undefined
  selectedTime.value = ''
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
    let preferredDateTime: string | undefined
    if (selectedDate.value && selectedTime.value) {
      const date = selectedDate.value.toDate(getLocalTimeZone())
      const timeParts = selectedTime.value.split(':')
      const hours = parseInt(timeParts[0] || '0')
      const minutes = parseInt(timeParts[1] || '0')

      date.setHours(hours, minutes, 0, 0)

      // ISO format
      preferredDateTime = date.toISOString()
    }

    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        industry: form.industry,
        message: form.message,
        preferredDateTime
      }
    })

    // Track successful form submission
    track('contact_form_submission', {
      industry: form.industry,
      hasPreferredDateTime: !!preferredDateTime
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
</script>
