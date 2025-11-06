<template>
  <SharedSection
    :title="t('pages.contact.team.title')"
    :description="t('pages.contact.team.description')"
  >
    <!-- Team Image -->
    <UIAppear direction="down">
      <div class="max-w-5xl mx-auto">
        <div class="relative rounded-2xl overflow-hidden shadow-2xl">
          <NuxtImg
            src="/images/team.avif"
            alt="Konty team"
            class="w-full h-auto"
            loading="lazy"
            sizes="sm:100vw md:90vw lg:80vw"
          />
        </div>
      </div>
    </UIAppear>
  </SharedSection>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
