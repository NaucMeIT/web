import { t } from 'elysia'

export const errorResponseModel = t.Object({
  state: t.String(),
  message: t.String(),
  code: t.Number(),
  errorCode: t.String(),
  correlationId: t.String(),
  description: t.Optional(t.String()),
})

export const headersModel = t.Object({
  authorization: t.Optional(t.String()),
})
