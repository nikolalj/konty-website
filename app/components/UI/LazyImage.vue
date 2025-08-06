<template>
  <NuxtImg
    :src="src"
    :alt="alt"
    :width="width"
    :height="height"
    :preset="preset"
    :loading="eager ? 'eager' : 'lazy'"
    :sizes="sizes"
    :class="imageClass"
    @load="onLoad"
    @error="onError"
  />
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  preset?: 'hero' | 'thumbnail' | string
  eager?: boolean  // For LCP images (above the fold)
  sizes?: string
  imageClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  preset: undefined,
  eager: false,
  sizes: '(max-width: 768px) 100vw, 50vw',
  imageClass: undefined
})

const emit = defineEmits<{
  load: [string | Event]
  error: [string | Event]
}>()

const onLoad = (event: string | Event) => {
  emit('load', event)
}

const onError = (event: string | Event) => {
  console.error('Image failed to load:', props.src)
  emit('error', event)
}
</script>