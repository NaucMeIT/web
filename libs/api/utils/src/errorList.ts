export type ApiErrorCode = keyof typeof apiErrorList

export type ErrorDefinition = {
  message: string
  httpStatusCode?: number
  description?: string
  troubleshoot?: ReactNode[]
}

export type ErrorDescription = NonDocumentedErrorDescription | DocumentedErrorDescription

export type NonDocumentedErrorDescription = {
  state: string
  message: string
  code: number
}

export type DocumentedErrorDescription = NonDocumentedErrorDescription & {
  errorCode: string
  hint?: string
  documentationUrl: string
}

export type ApiErrorResponse = ErrorDescription & {
  correlationId: string
}

export const ERROR_LIST = {
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
} as const
