// Composable for managing pricing selection and contact form interaction
export const usePricingContactForm = () => {
  const selectedSubscription = useState<string | null>(
    'selectedSubscription',
    () => null
  )

  // Set subscription and trigger scroll
  const selectPricingPlan = (subscription: string, industry: string) => {
    selectedSubscription.value = subscription

    // Emit custom event for contact form to listen to
    if (import.meta.client) {
      window.dispatchEvent(
        new CustomEvent('pricing-plan-selected', {
          detail: { subscription, industry }
        })
      )
    }
  }

  // Function to clear subscription
  const clearSubscription = () => {
    selectedSubscription.value = null
  }

  return {
    selectedSubscription,
    selectPricingPlan,
    clearSubscription
  }
}
