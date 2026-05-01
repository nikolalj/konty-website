export const useViberLink = () => {
  const { t } = useI18n()

  // Keep the "+" so the number stays in E.164 form for the deep link.
  const phoneNumber = computed(() =>
    t('data.company.contact.phone').replace(/[\s()-]/g, '')
  )

  const encodedNumber = computed(() => encodeURIComponent(phoneNumber.value))

  // Default href and desktop target. Viber Desktop opens a chat directly;
  // Viber Mobile responds with "Request unavailable" for chat?number= and
  // requires contact?number= instead — handled by buildViberClickHandler.
  // Background: there is no documented Viber deep-link scheme that opens a
  // chat with an arbitrary phone number on mobile; viber://pa?chatURI= is
  // the only one-tap-to-chat path and requires a Viber Small Business
  // Account (free; separate identity from the personal phone number).
  const viberLink = computed(() => `viber://chat?number=${encodedNumber.value}`)

  const viberLinkMobile = computed(() => `viber://contact?number=${encodedNumber.value}`)

  // Click handler that swaps to the mobile URL when the device looks mobile.
  // Use as @click on the <a href={viberLink}>; it preventDefaults and
  // navigates to the mobile URL on touch devices.
  const buildViberClickHandler = () => (e: MouseEvent) => {
    if (typeof window === 'undefined') return
    const isMobile =
      window.matchMedia?.('(pointer: coarse)').matches
      || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    if (!isMobile) return
    e.preventDefault()
    window.location.href = viberLinkMobile.value
  }

  return { phoneNumber, viberLink, viberLinkMobile, buildViberClickHandler }
}
