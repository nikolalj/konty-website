<template>
  <section class="py-20">
    <UContainer>
      <SharedSectionHeading
        :title="$t('contact.title')"
        :description="$t('contact.description')"
      />

      <div class="flex justify-center">
        <div class="p-8 rounded-2xl max-w-3xl w-full">
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {{ $t('contact.form.name') }}
              </label>
              <UInput
                id="name"
                v-model="form.name"
                class="w-full"
                :placeholder="$t('contact.form.namePlaceholder')"
                size="xl"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {{ $t('contact.form.email') }}
              </label>
              <UInput
                id="email"
                v-model="form.email"
                class="w-full"
                type="email"
                :placeholder="$t('contact.form.emailPlaceholder')"
                size="xl"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                {{ $t('contact.form.message') }}
              </label>
              <UTextarea
                id="message"
                v-model="form.message"
                class="w-full"
                :placeholder="$t('contact.form.messagePlaceholder')"
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
              {{ $t('contact.form.submit') }}
            </UButton>
          </form>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)

const onSubmit = async () => {
  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  loading.value = false
}
</script>