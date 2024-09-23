import type { ApiErrorCode, ApiErrorMessageRaw, ApiErrorResponse, ErrorDefinition } from './errorList'
import { ERROR_LIST } from './errorList'

type KeyType = 'PROD' | 'DEV' | 'ROOT'

type ValidResult = { isValid: false } | { isValid: true; type: KeyType }

export function parseApiKey(apiKey: string): ValidResult {
  const parse = apiKey.match(/^(PROD|DEV_|ROOT)([a-zA-Z0-9]{28})$/)
  return parse ? { isValid: true, type: (parse[1] || '').replace('_', '') as KeyType } : { isValid: false }
}

export function formatApiErrorResponse(
  request: Request,
  errorCode: ApiErrorCode | ApiErrorMessageRaw,
  errorDetails?: { [key: string]: string | number | boolean },
): ApiErrorResponse {
  const errorCodeResolved: ApiErrorCode = isApiErrorCode(errorCode) ? errorCode : 'PUBLIC_COMMON_RAW_ERROR'
  const { message, code, description }: ErrorDefinition = ERROR_LIST[errorCodeResolved]

  return {
    state: 'error',
    message: ERROR_LIST[errorCode as keyof typeof ERROR_LIST] ? message : errorCode,
    code: code || 500,
    errorCode: errorCodeResolved,
    correlationId: String('requestId' in request ? request.requestId : ''),
    description,
    ...errorDetails,
  }
}

function isApiErrorCode(code: string): code is ApiErrorCode {
  return code in ERROR_LIST
}
