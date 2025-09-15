<template>
  <SharedSection
    :variant="props.variant"
  >
    <h2 class="text-4xl font-bold text-gray-800">ProductFeatures</h2>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  }
})
</script>
