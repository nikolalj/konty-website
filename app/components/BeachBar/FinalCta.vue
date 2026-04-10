<template>
  <section class="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 py-20 lg:py-28">
    <!-- Decorative elements -->
    <div class="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/5" />
    <div class="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-white/[0.04]" />
    <div class="absolute right-[20%] top-[20%] h-20 w-20 rounded-full bg-secondary/10 blur-[30px]" />

    <UContainer class="relative z-10">
      <div class="mx-auto max-w-xl text-center text-white">
        <UIAppear>
          <div class="text-4xl">☀️</div>
          <h2 class="mt-4 text-3xl font-extrabold sm:text-4xl">
            {{ t('pages.solutions.beachBar.final.title') }}
          </h2>
          <p class="mt-4 text-lg leading-relaxed text-white/85">
            {{ t('pages.solutions.beachBar.final.description') }}
          </p>
        </UIAppear>

        <UIAppear :delay-ms="200">
          <div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <AppCTAButton
              variant="custom"
              :custom-label="t('pages.solutions.beachBar.final.cta.viber')"
              :custom-to="viberLink"
              custom-icon="i-simple-icons-viber"
              custom-class="w-full sm:w-auto justify-center rounded-full bg-[#7360f2] !text-white shadow-lg shadow-[#7360f2]/40 hover:bg-[#6350e2] !ring-0"
              external
              section="beach-bar-final"
            />
            <AppCTAButton
              variant="custom"
              :custom-label="t('pages.solutions.beachBar.final.cta.demo')"
              custom-to="/demo"
              custom-class="w-full sm:w-auto justify-center rounded-full border-2 border-white/40 !text-white hover:bg-white/10 !ring-0 bg-transparent"
              no-icon
              section="beach-bar-final"
            />
          </div>

          <div class="mt-6 flex items-center justify-center gap-2 text-sm text-white/60">
            <Icon name="i-lucide-phone" class="h-4 w-4" />
            <span>{{ t('pages.solutions.beachBar.final.cta.phone') }}: {{ t('data.company.contact.phone') }}</span>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { viberLink } = useViberLink()
</script>
