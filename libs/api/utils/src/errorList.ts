export type ApiErrorCode = keyof typeof ERROR_LIST

export type ApiErrorMessageRaw = `${string}`

export interface ErrorDefinition {
  message: ApiErrorMessageRaw
  code?: number
  description?: string
  troubleshoot?: string[]
}

export interface DocumentedErrorDescription {
  state: string
  message: ApiErrorMessageRaw
  code: number
  errorCode: ApiErrorCode
  description?: string
  hint?: string
}

export type ApiErrorResponse = DocumentedErrorDescription & {
  correlationId: string
}

export const ERROR_LIST = {
  PUBLIC_COMMON_RAW_ERROR: {
    code: 500,
    message: 'Common raw error.',
    description: 'This is a general error for which there is no direct documentation. Please follow the error message.',
  },
  PUBLIC_API_KEY_DOES_NOT_EXIST: {
    code: 401,
    message: 'Organisation API key does not exist or is broken.',
    description: 'Parameter "apiKey" is always required.',
  },
  PUBLIC_API_KEY_IS_NOT_IN_VALID_FORMAT: {
    code: 401,
    message: 'Organisation API key does not match expected format.',
    description: 'Please use 32 char length key generated from system.',
  },
  PUBLIC_API_KEY_HAS_BEEN_DELETED: {
    code: 401,
    message: 'Organisation API key has been deleted.',
  },
  PUBLIC_API_KEY_IS_NOT_ACTIVE: {
    code: 401,
    message: 'Organisation API key is not active now.',
  },
  PUBLIC_API_KEY_HAS_BEEN_EXPIRED: {
    code: 401,
    message: 'Organisation API key has been expired.',
  },
  USER_CREDIT_CAN_NOT_BE_NEGATIVE: {
    code: 402,
    message: 'Credit operation is not permitted. User credit can not be smaller than zero.',
  },
} as const
