<template>
  <section id="beach-contact" class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 lg:py-28">
    <!-- Decorative elements -->
    <div class="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
    <div class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/[0.04]" />
    <div class="absolute right-[20%] top-[20%] h-20 w-20 rounded-full bg-secondary/10 blur-[30px]" />

    <UContainer class="relative z-10">
      <!-- Top: shared headline -->
      <div class="mx-auto max-w-2xl text-center text-white">
        <UIAppear>
          <Icon name="i-lucide-sun" class="mx-auto h-14 w-14 text-amber-300" />
          <h2 class="mt-6 text-3xl font-extrabold sm:text-4xl">
            {{ t('pages.solutions.beachBar.final.title') }}
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-white/85">
            {{ t('pages.solutions.beachBar.final.description') }}
          </p>
        </UIAppear>
      </div>

      <!-- Bottom: two-track close -->
      <UIAppear :delay-ms="200">
        <div class="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 lg:gap-10">
          <!-- Left: Viber track -->
          <div class="flex flex-col justify-center text-center text-white lg:text-left">
            <h3 class="text-xl font-bold">
              {{ t('pages.solutions.beachBar.final.form.viberSide.title') }}
            </h3>
            <p class="mt-3 text-base text-white/85">
              {{ t('pages.solutions.beachBar.final.form.viberSide.subtitle') }}
            </p>
            <div class="mt-6 flex justify-center lg:justify-start">
              <AppCTAButton
                variant="beach-primary"
                custom-class="shadow-lg shadow-[#7360f2]/40"
                :custom-label="t('pages.solutions.beachBar.final.cta.viber')"
                section="beach-bar-final"
              />
            </div>
            <div class="mt-5 flex items-center justify-center gap-2 text-sm text-white/60 lg:justify-start">
              <Icon name="i-lucide-phone" class="h-4 w-4" />
              <span>{{ t('pages.solutions.beachBar.final.cta.phone') }}: {{ t('data.company.contact.phone') }}</span>
            </div>
          </div>

          <!-- Right: Form track -->
          <div class="rounded-2xl bg-white p-6 shadow-xl sm:p-8">
            <h3 class="text-xl font-bold text-gray-900">
              {{ t('pages.solutions.beachBar.final.form.title') }}
            </h3>
            <p class="mt-2 text-sm text-gray-600">
              {{ t('pages.solutions.beachBar.final.form.subtitle') }}
            </p>
            <div class="mt-5">
              <BeachBarContactForm />
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
