import { isApiErrorCode } from '../api'
import { type ApiErrorCode, type DocumentedErrorDescription, ERROR_LIST, type ErrorDefinition } from '../errorList'

interface ApiError {
  code?: number
  message?: string
  state?: string
}

export function parseError(error: Error | string | ApiError | unknown): DocumentedErrorDescription {
  const e = normalizeType(error)
  const message = (typeof e === 'string' ? e : e.message) || 'Internal Server Error'
  const errorDefinition: ErrorDefinition | undefined = ERROR_LIST[message as ApiErrorCode]
  const state = (() => {
    if (!error) return ''
    if (typeof error === 'object') {
      if ('state' in error && typeof error.state === 'string') return error.state
      if ('name' in error && typeof error.name === 'string') return error.name
    }
    return ''
  })()

  const errorCodeResolved: ApiErrorCode = isApiErrorCode(message) ? message : 'PUBLIC_COMMON_RAW_ERROR'

  return {
    state: (state || 'exception').toLowerCase(),
    code: 500,
    message: errorDefinition?.message || message,
    errorCode: errorCodeResolved, // TODO: TS error. I dont know why.
    ...(errorDefinition
      ? {
          code: errorDefinition.code || 500,
          errorCode: message,
          hint: errorDefinition.description,
          documentationUrl: `https://brj.app/documentation/error/${message}`,
        }
      : {}),
  }
}

function normalizeType(error: unknown): Error | string {
  if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string')
    return error.message
  if (typeof error === 'object') return error as Error
  return String(error)
}
