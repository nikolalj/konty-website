<template>
  <section class="py-20">
    <UContainer>
      <SharedSectionHeading
        :title="config.title"
        :description="config.description"
      />

      <div class="flex justify-center">
        <div class="p-8 rounded-2xl max-w-3xl w-full">
          <form class="space-y-6" @submit.prevent="onSubmit">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Ime i prezime
              </label>
              <UInput
                id="name"
                v-model="form.name"
                class="w-full"
                placeholder="Unesite vaše ime"
                size="xl"
                required
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Email adresa
              </label>
              <UInput
                id="email"
                v-model="form.email"
                class="w-full"
                type="email"
                placeholder="vas@email.com"
                size="xl"
                required
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                Poruka
              </label>
              <UTextarea
                id="message"
                v-model="form.message"
                class="w-full"
                placeholder="Napišite vašu poruku..."
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
              Pošalji poruku
            </UButton>
          </form>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const config = ref({
  title: 'Kontaktirajte nas',
  description: 'Pošaljite nam poruku i odgovorićemo vam u najkraćem roku.'
})

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
