export type OperationClass = 'A' | 'B' | 'C'

export interface ExtendedRequest extends Request {
  requestId: string
  apiKey?: string
}

export interface ApiKeyReportUsageRequest {
  request: Request
  apiKey?: string
  operationClass?: OperationClass
  spend?: number | bigint
  metaData?: object
}

export interface ApiUsageReport {
  operation: OperationClass
  spend: number
  operations: number
}

export interface ApiKeyRecord {
  id: bigint
  organisation_id: number
  is_active: boolean
  is_deleted: boolean
  expiration_date: Date
  user_id?: string
  full_name?: string
  email?: string
}

export type ApiUsageRequest = ({ organisationId: number } | { userId: number } | { apiKey: string }) & {
  dateFrom?: Date
  dateTo?: Date
}
