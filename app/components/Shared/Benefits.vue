<template>
  <SharedSection
    :variant="props.variant"
  >
    <h2 class="text-4xl font-bold text-gray-800">Benefits</h2>
  </SharedSection>
</template>

<script setup lang="ts">
import type { SectionVariantType } from '~/types/components'

const props = defineProps({
  variant: {
    type: String as PropType<SectionVariantType>,
    default: undefined,
  },
  product: {
    type: String as PropType<'retail' | 'hospitality' | undefined>,
    default: undefined
  },
})
</script>
