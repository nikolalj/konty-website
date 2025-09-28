<template>
  <section class="py-6 sm:py-9">
    <UContainer>
      <UFooterColumns :columns="columns">
        <template #right>
          <UFormField name="email" :label="t('ui.footer.newsletter.title')" size="lg">
            <UInput
              v-model="newsletterEmail"
              type="email"
              class="w-full"
              :placeholder="t('ui.footer.newsletter.emailPlaceholder')"
              @keyup.enter="handleNewsletterSubmit"
            >
              <template #trailing>
                <UButton
                  type="submit"
                  size="xs"
                  color="neutral"
                  :label="t('ui.footer.newsletter.subscribe')"
                  @click="handleNewsletterSubmit"
                />
              </template>
            </UInput>
          </UFormField>
        </template>
      </UFooterColumns>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { FooterColumn } from '@nuxt/ui'

const { t } = useI18n()
const localePath = useLocalePath()
const { track } = useTracking()

const newsletterEmail = ref('')

const handleNewsletterSubmit = () => {
  if (newsletterEmail.value) {
    track('newsletter_subscription')
    // TODO: Implement actual newsletter subscription
    newsletterEmail.value = ''
  }
}

const columns: FooterColumn[] = [
  {
    label: t('ui.footer.links.products'),
    children: [
      { label: t('ui.navigation.products.forHospitality'), to: localePath('/products/hospitality') },
      { label: t('ui.navigation.products.forRetail'), to: localePath('/products/retail') },
      { label: t('ui.navigation.main.pricing'), to: localePath('/pricing') },
      { label: t('ui.common.buttons.bookDemo'), to: localePath('/demo') }
    ]
  },
  {
    label: t('ui.footer.links.company'),
    children: [
      { label: t('ui.footer.links.contact'), to: localePath('/contact') },
      { label: t('ui.footer.links.partners'), to: localePath('/partners') },
      { label: t('ui.footer.links.careers'), to: localePath('/contact') }
    ]
  },
  {
    label: t('ui.footer.links.legal'),
    children: [
      { label: t('ui.footer.links.privacy'), to: localePath('/privacy') },
      { label: t('ui.footer.links.terms'), to: localePath('/terms') },
      { label: t('ui.footer.links.dpa'), to: localePath('/contact') }
    ]
  }
]
</script>
