export const useFeaturedImage = (imagePath?: string) => {
  const defaultImage = 'https://konty.com/og-default.webp'
  const baseUrl = 'https://konty.com'

  const featuredImage = computed(() => {
    if (!imagePath) return defaultImage

    // Handle absolute URLs
    if (imagePath.startsWith('http')) return imagePath

    // Handle relative URLs
    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`
    return `${baseUrl}${cleanPath}`
  })

  // Generate different image sizes for different use cases
  const sizes = computed(() => ({
    // OpenGraph recommended size
    og: {
      width: 1200,
      height: 630,
      url: featuredImage.value
    },
    // Twitter card size
    twitter: {
      width: 1200,
      height: 600,
      url: featuredImage.value
    },
    // Thumbnail size
    thumbnail: {
      width: 300,
      height: 200,
      url: featuredImage.value
    }
  }))

  return {
    featuredImage,
    sizes,
    defaultImage
  }
}
