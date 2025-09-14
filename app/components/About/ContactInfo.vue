<template>
  <section class="py-12 sm:py-16">
    <UContainer>
      <UIAppear direction="up">
        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <!-- Address -->
          <div class="text-center">
            <Icon name="i-lucide-map-pin" class="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 class="font-semibold text-lg mb-2">{{ t('pages.about.contact.address.title') }}</h3>
            <p class="text-muted">{{ t('pages.about.contact.address.line1') }}</p>
            <p class="text-muted">{{ t('pages.about.contact.address.line2') }}</p>
          </div>

          <!-- Phone -->
          <div class="text-center">
            <Icon name="i-lucide-phone" class="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 class="font-semibold text-lg mb-2">{{ t('pages.about.contact.phone.title') }}</h3>
            <p class="text-muted">{{ t('pages.about.contact.phone.number') }}</p>
          </div>

          <!-- Email -->
          <div class="text-center">
            <Icon name="i-lucide-mail" class="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 class="font-semibold text-lg mb-2">{{ t('pages.about.contact.email.title') }}</h3>
            <p class="text-muted">{{ t('pages.about.contact.email.address') }}@konty.com</p>
          </div>

          <!-- Working Hours -->
          <div class="text-center">
            <Icon name="i-lucide-clock" class="w-8 h-8 text-primary mx-auto mb-4" />
            <h3 class="font-semibold text-lg mb-2">{{ t('pages.about.contact.hours.title') }}</h3>
            <p class="text-muted">{{ t('pages.about.contact.hours.weekdays') }}</p>
            <p class="text-muted">{{ t('pages.about.contact.hours.weekend') }}</p>
          </div>
        </div>
      </UIAppear>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
