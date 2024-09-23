import { bootApiRequest, computeUsage, errorResponseModel, reportSpend } from '@nmit-coursition/api/utils'
import { Elysia } from 'elysia'

export const apiDev = new Elysia({ prefix: '/dev' })
  .guard({
    response: {
      401: errorResponseModel,
      404: errorResponseModel,
      429: errorResponseModel,
      500: errorResponseModel,
    },
    detail: {
      tags: ['dev'],
    },
  })
  .onBeforeHandle((handler) => bootApiRequest(handler))
  .get('/ping', () => ({ status: 'PONG' }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .get('/report-usage', async () => await computeUsage({ organisationId: 1 }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
