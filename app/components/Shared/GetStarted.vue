<template>
  <UPageSection
    :title="t('pages.home.getStarted.title')"
    orientation="horizontal"
    :features="features"
    :reverse="product !== 'retail'"
    :ui="{
      root: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]',
    }"
  >
    <UIAppear>
      <NuxtImg
        src="/images/getstarted/getstarted.avif"
        format="avif"
        loading="lazy"
        alt="Get started image"
        role="presentation"
        width="500"
        height="500"
        quality="80"
        fit="inside"
        class="transition-transform duration-300 hover:scale-105"
      />
    </UIAppear>
  </UPageSection>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const product: Ref<'hospitality' | 'retail'> = ref('hospitality')

const features = computed(() => [
  {
    title: t('pages.home.getStarted.certificate.title'),
    description: t('pages.home.getStarted.certificate.description'),
    icon: 'i-lucide-shield-check',
    to: localePath('#')
  },
  {
    title: t('pages.home.getStarted.sepPortal.title'),
    description: t('pages.home.getStarted.sepPortal.description'),
    icon: 'i-lucide-user-round-pen',
    to: localePath('#')
  },
  {
    title: t('pages.home.getStarted.equipment.title'),
    description: t('pages.home.getStarted.equipment.description'),
    icon: 'i-lucide-smartphone',
    to: localePath('#')
  },
  {
    title: t('pages.home.getStarted.register.title'),
    description: t('pages.home.getStarted.register.description'),
    icon: 'i-lucide-user-round-check',
    to: localePath('#')
  }
])
</script>
