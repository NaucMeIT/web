import { formatApiErrorResponse } from '@nmit-coursition/api/utils'
import { invalidateSession, storeUserSession, updateUser } from '@nmit-coursition/auth'
import { WorkOS } from '@workos-inc/node'
import { Elysia } from 'elysia'

const workos = new WorkOS(process.env['WORKOS_API_KEY'], {
  clientId: process.env['WORKOS_CLIENT_ID'],
})

function parseCookies(cookieHeader: string): { [key: string]: string } {
  return Object.fromEntries(
    (cookieHeader || '').split(';').map((cookie): [string, string] => {
      const parts = cookie.split('=')
      return [parts.shift()?.trim() || '', decodeURIComponent(parts.join('=')).trim()]
    }),
  )
}

export const apiAuth = new Elysia({ prefix: '/auth' })
  .get('/ping', () => ({ status: 'PONG' }))
  .get('/login', ({ redirect }) => {
    const authorizationUrl = workos.userManagement.getAuthorizationUrl({
      provider: 'authkit',
      redirectUri: 'http://localhost:3000/auth/callback',
      clientId: process.env['WORKOS_CLIENT_ID'] || '',
    })

    return redirect(authorizationUrl)
  })
  .get('/callback', async ({ request, query, error, redirect }) => {
    const organisationId = 1 // TODO
    const code = String(query['code'] || '')

    if (!code) throw error(400, formatApiErrorResponse(request, 'No code provided.'))

    try {
      const authenticateResponse = await workos.userManagement.authenticateWithCode({
        clientId: process.env['WORKOS_CLIENT_ID'] || '',
        code,
        session: {
          sealSession: true,
          cookiePassword: process.env['WORKOS_COOKIE_PASSWORD'] || '',
        },
      })

      const { user, sealedSession } = authenticateResponse

      // TODO: res.cookie('wos-session', sealedSession, {
      // TODO:   path: '/',
      // TODO:   httpOnly: true,
      // TODO:   secure: true,
      // TODO:   sameSite: 'lax',
      // TODO: })

      // TODO: set('Set-Cookie', `wos-session=${sealedSession}; Path=/; HttpOnly; Secure; SameSite=Lax`)
      //set.cookie?.pokuas = {};
      //set.cookie['pokus'] = 'Hodnota';

      const internalUser = await updateUser(
        {
          ...user,
          profilePictureUrl: user.profilePictureUrl || '',
          firstName: user.firstName || '',
          lastName: user.lastName || '',
        },
        organisationId,
      )
      await storeUserSession(internalUser.id, sealedSession || '')

      return redirect('/')
    } catch (error) {
      // eslint-disable-next-line no-console debug info
      console.log('dump error', error)
      return redirect('/login')
    }
  })
  .get('/logout', async ({ request, redirect }) => {
    const cookies = parseCookies(request.headers.get('Cookie') || '')
    const sessionData = cookies['wos-session'] || ''

    if (!sessionData) return redirect('/login')

    try {
      const session = workos.userManagement.loadSealedSession({
        sessionData,
        cookiePassword: process.env['WORKOS_COOKIE_PASSWORD'] || '',
      })

      const url = await session.getLogoutUrl()

      // Expire cookies
      // TODO: set('Set-Cookie', 'wos-session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT')

      // TODO: Load cookies session and invalidate from DB
      await invalidateSession('TODO')

      return redirect(url)
    } catch (error) {
      // eslint-disable-next-line no-console debug info
      console.error(error)
      return redirect('/login')
    }
  })
