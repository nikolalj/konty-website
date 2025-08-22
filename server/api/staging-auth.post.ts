// Minimal auth endpoint for staging protection
export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)

  // Get password from environment or use fallback
  const STAGING_PASSWORD = process.env.STAGING_PASSWORD

  if (STAGING_PASSWORD && password === STAGING_PASSWORD) {
    // Set simple auth cookie
    setCookie(event, 'staging-auth', 'authorized', {
      httpOnly: true,
      secure: !import.meta.dev,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    })

    return { success: true }
  }

  setResponseStatus(event, 401)
  return { success: false }
})
