<template>
  <UPageSection
    :ui="{
      container: '!py-0',
      root: 'py-20'
    }"
  >
    <UContainer>
      <div class="max-w-lg mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Get in touch and we'll get back to you as soon as possible.
          </p>
        </div>

        <UCard class="p-6">
          <form class="space-y-4" @submit.prevent="onSubmit">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Name
              </label>
              <UInput
                id="name"
                v-model="form.name"
                class="w-full"
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email
              </label>
              <UInput
                id="email"
                v-model="form.email"
                class="w-full"
                type="email"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Message
              </label>
              <UTextarea
                id="message"
                v-model="form.message"
                class="w-full"
                placeholder="Your message..."
                :rows="4"
                required
              />
            </div>

            <UButton
              type="submit"
              size="lg"
              class="w-full"
              :loading="loading"
            >
              Send Message
            </UButton>
          </form>
        </UCard>
      </div>
    </UContainer>
  </UPageSection>
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

  // Simulate submission delay
  await new Promise(resolve => setTimeout(resolve, 1000))

  loading.value = false
}
</script>
