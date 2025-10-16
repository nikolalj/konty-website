<template>
  <div
    class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    :class="{ 'lg:flex lg:flex-row-reverse': reverse }"
  >
    <UIAppear :direction="reverse ? 'left' : 'right'" :distance="32">
      <div class="relative">
        <NuxtImg
          :src="image"
          format="avif"
          loading="lazy"
          :alt="imageAlt || title"
          role="presentation"
          width="600"
          height="500"
          quality="80"
          fit="inside"
          class="w-full h-auto rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105"
        />
      </div>
    </UIAppear>

    <UIAppear :direction="reverse ? 'right' : 'left'" :distance="32">
      <div class="space-y-6">
        <h3
          v-if="title"
          class="text-2xl sm:text-3xl font-bold text-highlighted"
        >
          {{ title }}
        </h3>

        <p v-if="description" class="text-lg text-muted">
          {{ description }}
        </p>

        <ul v-if="items && items.length > 0" class="space-y-4">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="flex items-start gap-3 transition-all duration-300 hover:translate-x-2"
          >
            <div class="flex-shrink-0 mt-1">
              <UIcon
                :name="item.icon || 'i-heroicons-check-circle'"
                class="h-6 w-6 text-primary-600 dark:text-primary-400"
              />
            </div>
            <div>
              <p class="text-base text-gray-900 dark:text-white">
                {{ item.text }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </UIAppear>
  </div>
</template>

<script setup lang="ts">
interface FeatureItem {
  text: string
  icon?: string
}

defineProps({
  title: {
    type: String,
    required: false,
    default: ''
  },
  description: {
    type: String,
    required: false,
    default: ''
  },
  image: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    required: false,
    default: ''
  },
  items: {
    type: Array as PropType<FeatureItem[]>,
    required: false,
    default: () => []
  },
  reverse: {
    type: Boolean,
    default: false
  }
})
</script>
