<!-- app/components/UI/LazyImage.vue -->
<template>
  <div class="lazy-image-wrapper" :style="wrapperStyle">
    <!-- Placeholder/skeleton while loading -->
    <div
      v-if="!imageLoaded && showSkeleton"
      class="lazy-image-skeleton"
      :style="skeletonStyle"
    />

    <!-- Actual image -->
    <NuxtImg
      :src="imageSrc"
      :alt="alt"
      :width="width"
      :height="height"
      :sizes="sizes"
      :loading="loading"
      :fetchpriority="priority"
      :preset="preset"
      :placeholder="placeholder"
      :quality="imageQuality"
      :format="imageFormat"
      :class="[
        'lazy-image',
        imageClass,
        { 'lazy-image--loaded': imageLoaded }
      ]"
      @load="onImageLoad"
      @error="onImageError"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  preset?: 'hero' | 'thumbnail' | 'card' | 'avatar' | string
  eager?: boolean
  priority?: 'high' | 'low' | 'auto'
  sizes?: string
  imageClass?: string
  showSkeleton?: boolean
  placeholder?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  width: undefined,
  height: undefined,
  preset: undefined,
  eager: false,
  priority: 'auto',
  sizes: '(max-width: 768px) 100vw, 50vw',
  imageClass: undefined,
  showSkeleton: true,
  placeholder: 10 // Blur placeholder size
})

const emit = defineEmits<{
  load: [Event]
  error: [Event]
}>()

// Use network-aware loading
const { isSlowConnection, shouldLoadHD } = useNetworkStatus()

// State
const imageLoaded = ref(false)
const imageError = ref(false)

// Computed properties
const loading = computed(() => props.eager ? 'eager' : 'lazy')

const imageSrc = computed(() => {
  // Use lower quality images on slow connections
  if (isSlowConnection.value && props.src.includes('hero')) {
    return props.src.replace('hero', 'thumbnail')
  }
  return props.src
})

const imageQuality = computed(() => {
  if (isSlowConnection.value) return 60
  if (shouldLoadHD.value) return 90
  return 75
})

const imageFormat = computed(() => {
  if (isSlowConnection.value) return 'webp'
  return undefined // Let the system decide
})

const aspectRatio = computed(() => {
  if (props.width && props.height) {
    return props.height / props.width
  }
  return 0.5625 // Default 16:9
})

const wrapperStyle = computed(() => ({
  position: 'relative',
  paddingBottom: props.width && props.height ? `${aspectRatio.value * 100}%` : undefined,
  backgroundColor: '#f3f4f6'
}))

const skeletonStyle = computed(() => ({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite'
}))

// Methods
const onImageLoad = (event: Event) => {
  imageLoaded.value = true
  emit('load', event)
}

const onImageError = (event: Event) => {
  imageError.value = true
  console.error('Image failed to load:', props.src)
  emit('error', event)
}

// Intersection Observer for lazy loading metrics
onMounted(() => {
  const imgElement = document.querySelector('.lazy-image') as HTMLElement

  if (imgElement && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // Track lazy loading performance
            performance.mark(`image-${props.src}-visible`)
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '50px' }
    )

    observer.observe(imgElement)
  }
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.lazy-image-wrapper {
  overflow: hidden;
  background-color: #f3f4f6;
}

.lazy-image {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  width: 100%;
  height: auto;
}

.lazy-image--loaded {
  opacity: 1;
}

.lazy-image-skeleton {
  border-radius: inherit;
}
</style>
