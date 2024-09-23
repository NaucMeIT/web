import { apiCommonGuard, reportSpend } from '@nmit-coursition/api/utils'
import { Elysia } from 'elysia'

export const apiAuth = new Elysia({ prefix: '/auth' }).use(apiCommonGuard).get('/ping', () => ({ status: 'PONG' }), {
  afterResponse: ({ request }) => reportSpend({ request }),
})
