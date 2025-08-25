<template>
  <div style="display: none;">
    <!-- Schema component - no visual output -->
  </div>
</template>

<script setup lang="ts">
interface Props {
  serviceType?: 'pos-system' | 'implementation' | 'support' | 'training'
}

const props = withDefaults(defineProps<Props>(), {
  serviceType: 'pos-system'
})

useLocalizedSchema({
  type: 'Service',
  serviceType: props.serviceType
})
</script>