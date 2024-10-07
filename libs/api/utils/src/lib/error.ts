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

  return {
    state: (state || 'exception').toLowerCase(),
    code: 500,
    message: errorDefinition?.message || message,
    errorCode: isApiErrorCode(message) ? message : 'PUBLIC_COMMON_RAW_ERROR',
    ...(errorDefinition
      ? {
          code: errorDefinition.code || 500,
          hint: errorDefinition.description,
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
