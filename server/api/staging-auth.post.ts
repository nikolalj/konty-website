export default defineEventHandler(async (event) => {
console.log('-----------------------')
console.log(process.env.HOSTNAME)
console.log(process.env.NODE_ENV)
console.log(process.env.STAGING_PASSWORD)
console.log(__dirname)


  const { password } = await readBody(event)

  const config = useRuntimeConfig()

  if (config.stagingPassword && password === config.stagingPassword) {
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
