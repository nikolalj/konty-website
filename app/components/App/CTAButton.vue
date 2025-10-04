<template>
  <UButton
    :to="to"
    :size="size"
    :variant="variant === 'primary' ? 'solid' : 'outline'"
    :color="variant === 'primary' ? 'primary' : 'neutral'"
    :icon="!noIcon ? (variant === 'primary' ? 'i-lucide-calendar' : 'i-lucide-mail') : undefined"
    :class="variant === 'primary'
      ? 'font-semibold hover:bg-secondary'
      : 'font-semibold bg-transparent hover:bg-primary-200 dark:hover:bg-[#61356c] ring-2 ring-secondary'"
    @click="handleClick"
  >
    {{ label }}
  </UButton>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const { track } = useTracking()

const props = defineProps({
  variant: {
    type: String as PropType<'primary' | 'secondary'>,
    required: true
  },
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl'>,
    default: 'lg'
  },
  section: {
    type: String,
    default: undefined
  },
  noIcon: {
    type: Boolean,
    default: false
  }
})

const to = computed(() => {
  return props.variant === 'primary'
    ? localePath('/demo')
    : localePath('/contact')
})

const label = computed(() => {
  return props.variant === 'primary'
    ? t('ui.cta.primary')
    : t('ui.cta.secondary')
})

function handleClick() {
  if (props.section) {
    track('get_a_demo_cta', { location: props.section })
  }
}
</script>
