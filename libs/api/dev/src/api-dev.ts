import {
  type ApiErrorCode,
  ERROR_LIST,
  computeUsage,
  errorResponseModel,
  formatApiErrorResponse,
  reportSpend,
  validateApiKey,
} from '@nmit-coursition/api/utils'
import { Elysia, t } from 'elysia'

export const apiDev = new Elysia({ prefix: '/dev' })
  .guard({
    headers: t.Object({
      authorization: t.String({ error: 'You must provide API key to use this service.' }),
    }),
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
  .onBeforeHandle(async ({ headers, error, set }) => {
    const errorCode: ApiErrorCode | undefined = await validateApiKey(headers.authorization)
    if (errorCode) {
      set.headers['Content-Type'] = 'application/json; charset=utf8'
      throw error(ERROR_LIST[errorCode].code, formatApiErrorResponse(errorCode))
    }
  })
  .get('/ping', () => ({ status: 'PONG' }), {
    afterResponse: () => reportSpend({}),
  })
  .get('/report-usage', async () => await computeUsage({ organisationId: 1 }), {
    afterResponse: () => reportSpend({}),
  })
