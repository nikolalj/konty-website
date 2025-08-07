export {};

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set' | 'consent',
      targetId: string | Date,
      config?: object
    ) => void;
  }
}
