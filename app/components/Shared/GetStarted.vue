<template>
  <UPageSection
    :title="config.title"
    orientation="horizontal"
    :features="config.features"
    :reverse="product !== 'kontyRetail'"
    :ui="{
      root: 'bg-[var(--bg-100)] dark:bg-[var(--bg-200)]',
    }"
  >
    <UIAppear>
      <UILazyImage
        :src="config.image"
        preset=""
        :sizes="'100vw'"
        loading="eager"
        fetchpriority="high"
        alt=""
        role="presentation"
      />
    </UIAppear>
  </UPageSection>
</template>

<script setup lang="ts">
const product: Ref<'kontyHospitality' | 'kontyRetail'> = ref('kontyHospitality')

const config = ref({
  title: 'Želite da samostalno počnete sa radom?',
  image: 'https://ariapos.me/img/aria_device2.29fb96a7.png',
  features: [{
    title: 'Elektronski sertifikat',
    description: 'Nabavite elektronski serftifikat kod ovlašćenih kompanija (Pošta Crne Gore i Core IT)',
    icon: 'i-lucide-shield-check',
    to: '#'
  },{
    title: 'Samouslužni SEP portal',
    description: 'Registrujete se na Samouslužni (SEP) portal uprave prihoda. Na ovom portalu registrujete svoj poslovni prostor kao i operatera koji će izdavati račune.',
    icon: 'i-lucide-user-round-pen',
    to: '#'
  },{
    title: 'Kasa i ostala oprema',
    description: 'Možete koristiti bilo koji računar, tablet ili mobilni telefon. Uz ovaj uređaj možete koristiti termalni ili standardni printer i drugu opremu.',
    icon: 'i-lucide-smartphone',
    to: '#'
  },{
    title: 'Registrujte se na Konty program',
    description: 'Kroz Konty program registrujete svoj nalog, unesete kod poslovnog prostora i kod operatera, unesete svoje artikle i plan stolova i možete početi sa radom.',
    icon: 'i-lucide-user-round-check',
    to: '#'
  }]
})
</script>
