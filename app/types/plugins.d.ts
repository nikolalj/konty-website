// Analytics tracking plugin types
export interface TrackingPlugin {
  conversion: (eventName: string, eventData?: Record<string, unknown>) => void
  demoRequest: () => void
  contactForm: () => void
  ctaClick: (ctaName: string, ctaLocation: string) => void
  scrollDepth: (percentage: number) => void
  fileDownload: (fileName: string, fileType: string) => void
  externalLink: (url: string) => void
}

declare module '#app' {
  interface NuxtApp {
    $track: TrackingPlugin
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $track: TrackingPlugin
  }
}

export {}
