<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <UIAppear direction="up">
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="i in 12"
            :key="i"
            class="group cursor-pointer p-6 bg-elevated rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
          >
            <div class="flex items-start gap-4">
              <div class="h-16 w-16 bg-primary-100 dark:bg-primary-900 rounded-full flex-shrink-0" />
              <div class="flex-1">
                <h3 class="font-semibold text-lg group-hover:text-primary transition-colors">Client {{ i }}</h3>
                <p class="text-sm text-muted mb-2">Restaurant · Podgorica</p>
                <p class="text-muted line-clamp-3">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
                <span class="text-primary text-sm font-medium mt-2 inline-block">
                  {{ t('ui.readMore') }} →
                </span>
              </div>
            </div>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>