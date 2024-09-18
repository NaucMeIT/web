import { formatApiErrorResponse, validateApiKey } from '@nmit-coursition/api/utils'
import { type ApiErrorCode, ERROR_LIST } from '@nmit-coursition/api/utils'
import { Elysia, t } from 'elysia'

const errorResponseType = t.Object({
  state: t.String(),
  message: t.String(),
  code: t.Number(),
  errorCode: t.String(),
  correlationId: t.String(),
  description: t.Optional(t.String()),
})

export const apiDev = new Elysia({ prefix: '/dev' })
  .guard({
    headers: t.Object({
      authorization: t.String({ error: 'You must provide API key to use this service.' }),
    }),
    response: {
      401: errorResponseType,
      404: errorResponseType,
      429: errorResponseType,
      500: errorResponseType,
    },
    detail: {
      tags: ['dev'],
    },
  })
  .onBeforeHandle(async ({ headers, error, set }) => {
    const errorCode: ApiErrorCode | undefined = await validateApiKey(headers.authorization)
    if (errorCode) {
      set.headers['Content-Type'] = 'application/json; charset=utf8'
      return error(ERROR_LIST[errorCode].code, formatApiErrorResponse(errorCode))
    }
  })
  .get('/ping', 'PONG')
