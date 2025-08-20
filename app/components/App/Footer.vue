<template>
  <section class="py-6 sm:py-9">
    <UContainer>
      <UFooterColumns :columns="columns">
        <template #right>
          <UFormField name="email" label="Prijavite se na newsletter" size="lg">
            <UInput type="email" class="w-full" placeholder="Vaša e-pošta">
              <template #trailing>
                <UButton type="submit" size="xs" color="neutral" label="Prijavi se" />
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

const columns: FooterColumn[] = [
  {
    label: 'Proizvodi',
    children: [
      { label: 'Konty za ugostiteljstvo', to: '/konty-hospitality' },
      { label: 'Konty za maloprodaju', to: '/konty-retail' },
      { label: 'Cene', to: '/pricing' },
      { label: 'Zakažite demo', to: '/demo' }
    ]
  },
  {
    label: 'Kompanija',
    children: [
      { label: 'O nama', to: '/about' },
      { label: 'Kontakt', to: '/contact' },
      { label: 'Partneri', to: '/partners' },
      { label: 'Karijere', to: '/careers' }
    ]
  },
  {
    label: 'Pravno',
    children: [
      { label: 'Politika privatnosti', to: '/privacy' },
      { label: 'Uslovi korišćenja', to: '/terms' },
      { label: 'DPA (obrada podataka)', to: '/dpa' }
    ]
  }
]
</script>
