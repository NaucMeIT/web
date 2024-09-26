import { apiCommonGuard, computeUsage, reportSpend } from '@nmit-coursition/api/utils'
import { Elysia } from 'elysia'

export const apiDev = new Elysia({ prefix: '/dev' })
  .use(apiCommonGuard)
  .get('/ping', () => ({ status: 'PONG' }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .get('/report-usage', async () => await computeUsage({ organisationId: 1 }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
