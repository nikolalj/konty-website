export default defineEventHandler(async (event) => {
  const body = await readBody<{
    name: string
    email: string
    phone: string
    industry?: string
    message?: string
    subscription?: string
    preferredDateTime?: string
  }>(event)

  // Required fields validation
  if (!body.name || !body.email || !body.phone) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields'
    })
  }

  // Email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(body.email)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }

  // TODO: Implement email sending
  // For now, we just simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log('Contact form submission:', {
    name: body.name,
    email: body.email,
    phone: body.phone,
    industry: body.industry,
    message: body.message,
    subscription: body.subscription,
    preferredDateTime: body.preferredDateTime,
    timestamp: new Date().toISOString()
  })

  // Simulated successful response
  return {
    success: true,
    message: 'Contact form submitted successfully'
  }
})
