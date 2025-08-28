<template>
  <UPageSection
    :title="$t('getStarted.title')"
    orientation="horizontal"
    :features="features"
    :reverse="product !== 'kontyRetail'"
    :ui="{
      root: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]',
    }"
  >
    <UIAppear>
      <!-- <UILazyImage
        src="https://ariapos.me/img/aria_device2.29fb96a7.png"
        preset=""
        :sizes="'100vw'"
        loading="eager"
        fetchpriority="high"
        alt=""
        role="presentation"
      /> -->
    </UIAppear>
  </UPageSection>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()

const product: Ref<'kontyHospitality' | 'kontyRetail'> = ref('kontyHospitality')

const features = computed(() => [
  {
    title: t('getStarted.certificate.title'),
    description: t('getStarted.certificate.description'),
    icon: 'i-lucide-shield-check',
    to: localePath('#')
  },
  {
    title: t('getStarted.sepPortal.title'),
    description: t('getStarted.sepPortal.description'),
    icon: 'i-lucide-user-round-pen',
    to: localePath('#')
  },
  {
    title: t('getStarted.equipment.title'),
    description: t('getStarted.equipment.description'),
    icon: 'i-lucide-smartphone',
    to: localePath('#')
  },
  {
    title: t('getStarted.register.title'),
    description: t('getStarted.register.description'),
    icon: 'i-lucide-user-round-check',
    to: localePath('#')
  }
])
</script>
