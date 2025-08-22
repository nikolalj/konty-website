// Minimal auth endpoint for staging protection
export default defineEventHandler(async (event) => {
  const { password } = await readBody(event)

  const config = useRuntimeConfig()
  console.log('---------------', config.stagingPassword)

  if (config.stagingPassword && password === config.stagingPassword) {
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
