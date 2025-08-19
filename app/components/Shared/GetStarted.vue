<template>
  <UPageSection
    :title="config.title"
    orientation="horizontal"
    :features="config.features"
    :reverse="product !== 'kontyRetail'"
    :ui="{
      container: '!py-0',
      root: 'py-10 bg-[var(--bg-200)]'
    }"
  >
    <UILazyImage
      :src="config.image"
      preset=""
      :sizes="'100vw'"
      loading="eager"
      fetchpriority="high"
      alt=""
      role="presentation"
    />
  </UPageSection>
</template>

<script setup lang="ts">
const product: Ref<'kontyHospitality' | 'kontyRetail'> = ref('kontyHospitality')

const config = ref({
  title: 'Želite da samostalno počnete sa radom?s',
  image: 'https://ariapos.me/img/aria_device2.29fb96a7.png',
  features: [{
    title: 'Elektronski sertifikat',
    description: 'Da bi prešli na novi sistem elektronske fiskalizacije potrebno je da nabavite elektronski serftifikat kod ovlašćenih kompanija (Pošta Crne Gore i Core IT)',
    icon: 'i-lucide-layout-grid',
    to: '#'
  },{
    title: 'Samouslužni SEP portal',
    description: 'Nakon obezbjeđivanja elektronskog sertifikata potrebno je da se registrujete na Samouslužni (SEP) portal uprave prihoda. Na ovom portalu registrujete svoj poslovni prostor kao i operatera koji će izdavati račune.',
    icon: 'i-lucide-chef-hat',
    to: '#'
  },{
    title: 'Kasa i ostala oprema',
    description: 'Za potrebe elektronske fiskalizacije možete koristiti bilo koji računar, tablet ili mobilni telefon. Uz ovaj uređaj možete koristiti termalni ili standardni printer i drugu opremu.',
    icon: 'i-lucide-users',
    to: '#'
  },{
    title: 'Registrujte se na Konty program',
    description: 'Kroz Aria program registrujete svoj nalog, unesete kod poslovnog prostora i kod operatera, unesete svoje artikle i plan stolova i možete početi sa radom.',
    icon: 'i-lucide-users',
    to: '#'
  }]
})
</script>
