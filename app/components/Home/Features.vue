<template>
  <section class="py-10 bg-[var(--bg-200)]">
    <UContainer>
      <SharedSectionHeading
        v-model="product"
        :title="config[product].title"
        :description="config[product].description"
        :product-switch="true"
        product-switch-position="top"
      />


      <div
        :key="product"
        class="grid lg:grid-cols-2 gap-16 min-h-110"
      >
        <UIAppear direction="right" :distance="32" :animate-on="product">
          <div :class="product !== 'kontyRetail' ? 'lg:order-2' : 'lg:order-1'">
            <UILazyImage
              :src="config[product].image"
              preset=""
              :sizes="'100vw'"
              loading="eager"
              fetchpriority="high"
              alt=""
              role="presentation"
              class="w-full h-auto rounded-2xl transition-transform duration-300 hover:scale-105"
            />
          </div>
        </UIAppear>

        <UIAppear direction="left" :distance="32" :animate-on="product">
          <div :class="product !== 'kontyRetail' ? 'lg:order-1' : 'lg:order-2'">
            <!-- Features -->
            <div class="space-y-8 mb-12">
              <div
                v-for="(feature, index) in config[product].features"
                :key="`${product}-${index}`"
                class="flex gap-4 transition-all duration-300 hover:translate-x-2"
              >
                <div class="flex-shrink-0">
                  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-900/50">
                    <UIcon
                      :name="feature.icon"
                      class="h-6 w-6 text-white"
                    />
                  </div>
                </div>
                <div>
                  <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {{ feature.title }}
                  </h3>
                  <p class="text-gray-600 dark:text-gray-300">
                    {{ feature.description }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-col sm:flex-row gap-4">
              <UButton
                v-for="(link, index) in config[product].links"
                :key="`${product}-${index}`"
                :to="link.to"
                :color="link.color"
                :variant="link.variant"
                :trailing-icon="link.trailingIcon"
                size="lg"
                class="transition-all duration-200 hover:scale-105 hover:-translate-y-0.5"
              >
                {{ link.label }}
              </UButton>
            </div>
          </div>
        </UIAppear>
      </div>
    </UContainer>
  </section>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const product: Ref<'kontyHospitality' | 'kontyRetail'> = ref('kontyHospitality')

const config = ref({
  kontyHospitality: {
    title: 'Pojednostavite rad vašeg ugostiteljskog objekta',
    description:
      'Konty je razvijen za restorane, kafiće, barove i ketering. Kombinuje moćan POS sa funkcijama prilagođenim ugostiteljstvu kako biste gostima pružili vrhunsko iskustvo i maksimizovali profit.',
    image:
      'https://media.istockphoto.com/id/1271319044/photo/small-business-people-and-service-concept-happy-man-or-waiter-in-apron-at-counter-with.jpg?s=1024x1024&w=is&k=20&c=zcF6uTfA_cAEG-X9xrBwb5LaPnK_set4tCuPgFOiX98=',
    features: [
      {
        title: 'Upravljanje stolovima',
        description:
          'Intuitivna mapa stolova, sistem za rezervacije i statusi u realnom vremenu za optimalno sedenje i kraće vreme čekanja.',
        icon: 'i-lucide-layout-grid',
        to: '#'
      },
      {
        title: 'Kuhinjski ekran (KDS)',
        description:
          'Digitalne porudžbine sa tajmerima pripreme, statusima jela i jasnom komunikacijom između sale i kuhinje.',
        icon: 'i-lucide-chef-hat',
        to: '#'
      },
      {
        title: 'Upravljanje osobljem',
        description:
          'Evidencija smena i vremena, napojnice, performanse i dozvole po ulogama kako bi tim radio usklađeno i efikasno.',
        icon: 'i-lucide-users',
        to: '#'
      }
    ],
    links: [
      {
        label: 'Istražite funkcije za ugostiteljstvo',
        to: '#',
        color: 'primary',
        variant: 'solid',
        trailingIcon: 'i-lucide-arrow-right'
      },
      {
        label: 'Zakažite demo',
        to: '#',
        color: 'neutral',
        variant: 'subtle',
        trailingIcon: 'i-lucide-calendar'
      }
    ] as ButtonProps[]
  },

  kontyRetail: {
    title: 'Ubrzajte uspeh vaše maloprodaje',
    description: 'Konty Retail je kreiran za prodavnice i butike. Donosi napredno upravljanje zalihama, uvid u kupce i analitiku prodaje kako biste optimizovali operacije i povećali prihode.',
    image: 'https://media.istockphoto.com/id/2170880602/photo/smiling-baker-assisting-customer-in-cozy-artisan-bakery.jpg?s=1024x1024&w=is&k=20&c=hWdPeyIaXXQP8EOoYSCdqXY23OUDuwl71fnVIjGeNoc=',
    features: [
      {
        title: 'Upravljanje zalihama',
        description: 'Praćenje stanja u realnom vremenu, automatske nabavke, dobavljači i sinhronizacija više lokacija.',
        icon: 'i-lucide-package',
        to: '#'
      },
      {
        title: 'Uvid u kupce',
        description: 'Detaljni profili i istorija kupovine, lojalnost i alati za ciljani marketing.',
        icon: 'i-lucide-user-check',
        to: '#'
      },
      {
        title: 'Analitika prodaje',
        description: 'Napredni izveštaji: trendovi, performanse artikala, marže i praktični uvidi za rast.',
        icon: 'i-lucide-trending-up',
        to: '#'
      }
    ],
    links: [
      {
        label: 'Istražite funkcije za maloprodaju',
        to: '#',
        color: 'primary',
        variant: 'solid',
        trailingIcon: 'i-lucide-arrow-right'
      },
      {
        label: 'Započnite besplatno',
        to: '#',
        color: 'neutral',
        variant: 'outline',
        trailingIcon: 'i-lucide-play-circle'
      }
    ] as ButtonProps[]
  }
})

</script>
