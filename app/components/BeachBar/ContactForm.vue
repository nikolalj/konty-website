<template>
  <form class="space-y-4" @submit.prevent="onSubmit">
    <div>
      <label for="bb-name" class="block text-sm font-medium text-gray-700 mb-1.5">
        {{ t('pages.solutions.beachBar.final.form.fields.name') }}
      </label>
      <UInput
        id="bb-name"
        v-model="form.name"
        class="w-full"
        :placeholder="t('pages.solutions.beachBar.final.form.placeholders.name')"
        size="lg"
        :error="!!errors.name"
        @blur="validateName"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">
        {{ errors.name }}
      </p>
    </div>

    <div>
      <label for="bb-phone" class="block text-sm font-medium text-gray-700 mb-1.5">
        {{ t('pages.solutions.beachBar.final.form.fields.phone') }}
      </label>
      <UInput
        id="bb-phone"
        v-model="form.phone"
        class="w-full"
        type="tel"
        :placeholder="t('pages.solutions.beachBar.final.form.placeholders.phone')"
        size="lg"
        :error="!!errors.phone"
        @blur="validatePhone"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-600">
        {{ errors.phone }}
      </p>
    </div>

    <div>
      <label for="bb-beach" class="block text-sm font-medium text-gray-700 mb-1.5">
        {{ t('pages.solutions.beachBar.final.form.fields.beachName') }}
      </label>
      <UInput
        id="bb-beach"
        v-model="form.beachName"
        class="w-full"
        :placeholder="t('pages.solutions.beachBar.final.form.placeholders.beachName')"
        size="lg"
        :error="!!errors.beachName"
        @blur="validateBeachName"
      />
      <p v-if="errors.beachName" class="mt-1 text-sm text-red-600">
        {{ errors.beachName }}
      </p>
    </div>

    <UButton
      type="submit"
      color="primary"
      class="font-semibold"
      size="lg"
      block
      :loading="loading"
    >
      {{ t('pages.solutions.beachBar.final.form.submit') }}
    </UButton>
  </form>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { track } = useTracking()
const toast = useToast()

const form = reactive({
  name: '',
  phone: '',
  beachName: ''
})

const errors = reactive({
  name: '',
  phone: '',
  beachName: ''
})

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

const validateBeachName = () => {
  if (!form.beachName.trim()) {
    errors.beachName = t('pages.solutions.beachBar.final.form.errors.beachNameRequired')
    return false
  }
  errors.beachName = ''
  return true
}

const validateForm = () => {
  const isNameValid = validateName()
  const isPhoneValid = validatePhone()
  const isBeachValid = validateBeachName()
  return isNameValid && isPhoneValid && isBeachValid
}

const onSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name,
        phone: form.phone,
        email: '',
        message: `Beach: ${form.beachName}`
      }
    })

    track('beach_bar_contact_submission')

    // TODO(Task 4): switch to inline success state instead of toast+reset
    toast.add({
      title: t('ui.forms.messages.success'),
      description: t('ui.forms.messages.successDescription'),
      color: 'success',
      icon: 'i-lucide-check-circle'
    })
    form.name = ''
    form.phone = ''
    form.beachName = ''
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
</script>
