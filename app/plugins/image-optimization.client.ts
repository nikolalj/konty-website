export default defineNuxtPlugin(() => {
  if (typeof document === 'undefined') return

  // Add proper loading attributes to images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element
          
          // Find all images without loading attribute
          const images = element.querySelectorAll ? 
            element.querySelectorAll('img:not([loading])') : 
            []
          
          images.forEach((img) => {
            const imageElement = img as HTMLImageElement
            
            // Set loading="lazy" for images below the fold
            // First few images should be eager (already handled by components)
            if (!imageElement.hasAttribute('loading')) {
              imageElement.setAttribute('loading', 'lazy')
            }
            
            // Add dimensions if missing (prevent CLS)
            if (!imageElement.hasAttribute('width') && !imageElement.hasAttribute('height')) {
              // You can set default dimensions or fetch from natural size
              imageElement.addEventListener('load', () => {
                if (!imageElement.hasAttribute('width')) {
                  imageElement.setAttribute('width', imageElement.naturalWidth.toString())
                }
                if (!imageElement.hasAttribute('height')) {
                  imageElement.setAttribute('height', imageElement.naturalHeight.toString())
                }
              })
            }
          })
        }
      })
    })
  })

  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // Cleanup on page navigation
  window.addEventListener('beforeunload', () => {
    observer.disconnect()
  })
})