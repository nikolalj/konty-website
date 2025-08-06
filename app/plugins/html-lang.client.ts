export default defineNuxtPlugin(() => {
  // Set HTML lang attribute to Serbian
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('lang', 'sr')
  }
})