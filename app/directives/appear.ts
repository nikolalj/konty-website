import type { Directive } from "vue"

export type AppearOpts = {
  threshold?: number   // default 0.1
  once?: boolean       // default true
}

interface HTMLElementWithIO extends HTMLElement {
  _io?: IntersectionObserver
}

const appear: Directive<HTMLElementWithIO, AppearOpts> = {
  mounted(el, binding) {
    const threshold = binding.value?.threshold ?? 0.1
    const once = binding.value?.once ?? true

    // Respect reduced motion: show immediately, drop transitions
    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.remove("opacity-0")
      el.classList.remove("translate-y-6", "translate-x-6", "-translate-y-6", "-translate-x-6")
      el.classList.add("opacity-100", "translate-y-0", "translate-x-0")
      return
    }

    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // visible state
          el.classList.remove("opacity-0")
          // normalize any translate-* starters to 0
          el.classList.remove("translate-y-6", "translate-x-6", "-translate-y-6", "-translate-x-6")
          el.classList.add("opacity-100", "translate-y-0", "translate-x-0")

          if (once) {
            io.unobserve(el)
          }
        } else if (!once) {
          // reset (for repeat animations)
          el.classList.add("opacity-0")
          // leave your chosen initial translate-* class in your markup for repeat
        }
      }
    }, { threshold })

    io.observe(el)
    el._io = io
  },

  unmounted(el) {
    el._io?.disconnect()
  }
}

export default appear
