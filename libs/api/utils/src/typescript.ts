export interface ApiKeyReportUsageRequest {
  apiKey: string
  operationClass?: 'A' | 'B' | 'C'
  spend?: number | bigint
  metaData?: object
}
