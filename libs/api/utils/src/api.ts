import { v4 as uuidv4 } from 'uuid'
import type { ApiErrorCode, ApiErrorResponse, ErrorDescription } from './errorList'
import { ERROR_LIST } from './errorList'

type KeyType = 'PROD' | 'DEV' | 'ROOT'

type ValidResult = { isValid: false } | { isValid: true; type: KeyType }

export function parseApiKey(apiKey: string): ValidResult {
  const parse = apiKey.match(/^(PROD|DEV_|ROOT)([a-zA-Z0-9]{28})$/)
  return parse ? { isValid: true, type: parse[1].replace('_', '') as KeyType } : { isValid: false }
}

export function formatApiErrorResponse(
  errorCode: ApiErrorCode,
  errorDetails?: Partial<ErrorDescription>,
): ApiErrorResponse {
  const errorDefinition = ERROR_LIST[errorCode]
  return {
    state: 'error',
    message: errorDefinition.message,
    code: errorDefinition.code,
    errorCode,
    correlationId: uuidv4(),
    description: errorDefinition.description,
    ...errorDetails,
  }
}
