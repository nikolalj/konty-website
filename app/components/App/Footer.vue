<template>
  <section class="py-6 sm:py-9">
    <UContainer>
      <UFooterColumns :columns="columns">
        <template #right>
          <UFormField name="email" :label="$t('footer.newsletter')" size="lg">
            <UInput type="email" class="w-full" :placeholder="$t('footer.emailPlaceholder')">
              <template #trailing>
                <UButton type="submit" size="xs" color="neutral" :label="$t('footer.subscribe')" />
              </template>
            </UInput>
          </UFormField>
        </template>
      </UFooterColumns>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui-pro'

const { t } = useI18n()
const localePath = useLocalePath()

const columns: FooterColumn[] = [
  {
    label: t('footer.products'),
    children: [
      { label: t('nav.forHospitality'), to: localePath('/konty-hospitality') },
      { label: t('nav.forRetail'), to: localePath('/konty-retail') },
      { label: t('nav.pricing'), to: localePath('/pricing') },
      { label: t('common.bookDemo'), to: localePath('/demo') }
    ]
  },
  {
    label: t('footer.company'),
    children: [
      { label: t('footer.aboutUs'), to: localePath('/about') },
      { label: t('footer.contact'), to: localePath('/about') },
      { label: t('footer.partners'), to: localePath('/about') },
      { label: t('footer.careers'), to: localePath('/about') }
    ]
  },
  {
    label: t('footer.legal'),
    children: [
      { label: t('footer.privacy'), to: localePath('/privacy') },
      { label: t('footer.terms'), to: localePath('/terms') },
      { label: t('footer.dpa'), to: localePath('/about') }
    ]
  }
]
</script>
