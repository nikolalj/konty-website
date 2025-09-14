<template>
  <section class="py-6 sm:py-9">
    <UContainer>
      <UFooterColumns :columns="columns">
        <template #right>
          <UFormField name="email" :label="t('ui.footer.newsletter.title')" size="lg">
            <UInput type="email" class="w-full" :placeholder="t('ui.footer.newsletter.emailPlaceholder')">
              <template #trailing>
                <UButton type="submit" size="xs" color="neutral" :label="t('ui.footer.newsletter.subscribe')" />
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
    label: t('ui.footer.links.products'),
    children: [
      { label: t('ui.navigation.products.forHospitality'), to: localePath('/konty-hospitality') },
      { label: t('ui.navigation.products.forRetail'), to: localePath('/konty-retail') },
      { label: t('ui.navigation.main.pricing'), to: localePath('/pricing') },
      { label: t('ui.common.buttons.bookDemo'), to: localePath('/demo') }
    ]
  },
  {
    label: t('ui.footer.links.company'),
    children: [
      { label: t('ui.footer.links.aboutUs'), to: localePath('/about') },
      { label: t('ui.footer.links.contact'), to: localePath('/about') },
      { label: t('ui.footer.links.partners'), to: localePath('/about') },
      { label: t('ui.footer.links.careers'), to: localePath('/about') }
    ]
  },
  {
    label: t('ui.footer.links.legal'),
    children: [
      { label: t('ui.footer.links.privacy'), to: localePath('/privacy') },
      { label: t('ui.footer.links.terms'), to: localePath('/terms') },
      { label: t('ui.footer.links.dpa'), to: localePath('/about') }
    ]
  }
]
</script>
