import { bootApiRequest, errorResponseModel, reportSpend } from '@nmit-coursition/api/utils'
import { Elysia } from 'elysia'

export const apiAuth = new Elysia({ prefix: '/auth' })
  .guard({
    response: {
      401: errorResponseModel,
      404: errorResponseModel,
      429: errorResponseModel,
      500: errorResponseModel,
    },
    detail: {
      tags: ['auth'],
    },
  })
  .onBeforeHandle((handler) => bootApiRequest(handler))
  .get('/ping', () => ({ status: 'PONG' }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
