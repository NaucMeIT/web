import { Elysia } from 'elysia'
import { apiCommonGuard, computeUsage, reportSpend } from './utils/api-utils'

export const apiDev = new Elysia({ prefix: '/dev', tags: ['dev'] })
  .use(apiCommonGuard)
  .get('/ping', () => ({ status: 'ZEROPS' }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .get('/fail', () => {
    throw new Error(
      `This is error message from always failing endpoint. Current server time: ${new Date().toISOString()}`,
    )
  })
  .get('/report-usage', async () => await computeUsage({ organisationId: 1 }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
