<template>
  <div id="demo-form" class="light bg-white rounded-2xl shadow-2xl p-8 lg:mt-0">
    <h3 class="text-black text-2xl font-bold mb-2">
      {{ t('pages.demo.hero.formTitle') }}
    </h3>
    <p class="text-black mb-6 text-sm">
      {{ t('pages.demo.hero.formDescription') }}
    </p>

    <div class="w-full">
      <form class="space-y-4" @submit.prevent="onSubmit">
        <div>
          <label for="demo-name" class="block text-sm font-medium text-gray-700 mb-2">
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
          <label for="demo-email" class="block text-sm font-medium text-gray-700 mb-2">
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
          <label for="demo-phone" class="block text-sm font-medium text-gray-700 mb-2">
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
          <label for="demo-datetime" class="block text-sm font-medium text-gray-700 mb-2">
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
          <label for="demo-industry" class="block text-sm font-medium text-gray-700 mb-2">
            {{ t('ui.forms.fields.industry') }} <span class="text-gray-400">({{ t('ui.forms.optional') }})</span>
          </label>
          <USelect
            id="demo-industry"
            v-model="form.industry"
            :items="industryOptions"
            :content="{
              bodyLock: false
            }"
            class="w-full"
            size="lg"
          />
        </div>

        <UButton
          type="submit"
          color="primary"
          :ui="{
            base: '!bg-[#4a2d67] !text-white hover:!bg-[#3b2453] dark:!bg-[#4a2d67] dark:hover:!bg-[#3b2453]'
          }"
          class="text-center font-semibold"
          size="lg"
          block
          :loading="loading"
        >
          {{ t('ui.forms.buttons.bookDemo') }}
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { track } = useTracking()

const form = reactive({
  name: '',
  email: '',
  phone: '',
  preferredDateTime: '',
  industry: ''
})

const industryOptions = ref([
  { label: t('ui.forms.industryOptions.hospitality'), value: 'hospitality' },
  { label: t('ui.forms.industryOptions.retail'), value: 'retail' },
  { label: t('ui.forms.industryOptions.other'), value: 'other' }
])

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true

  // Track demo form submission
  track('book_a_demo_form')

  // TODO: Implement actual form submission
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}
</script>
