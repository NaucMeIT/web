import { prisma } from '@nmit-coursition/db'
import { isDateBeforeNow } from '@nmit-coursition/utils'
import { Prisma } from '@prisma/client'
import { parseApiKey } from '../api'
import type { ApiErrorCode } from '../errorList'
import type { ApiKeyReportUsageRequest, ApiUsageReport, ApiUsageRequest } from '../typescript'

let API_KEY_TO_ID_CACHE: { [key: string]: bigint } = {}

let API_KEY_CONTEXT: string | undefined

export function reportUsage(apiKey: string, duration: number, type: 'video' | 'document' | 'web') {
  // eslint-disable-next-line no-console -- will be replaced with real usage reporting
  console.log(`API Key ${apiKey} used ${duration} on ${type}.`)
}

export async function reportSpend({ apiKey, operationClass, spend, metaData }: ApiKeyReportUsageRequest) {
  const key = apiKey || API_KEY_CONTEXT
  if (!key) throw new Error(`API key context has not been set. Please define apiKey.`)

  // eslint-disable-next-line no-console debug info
  console.log(`🚀 Spend report (${operationClass || 'A'}): ${spend || 1}`)

  await prisma.core__api_key_usage.create({
    data: {
      key_id: await resolveApiKeyIdByKey(key),
      operation_class: operationClass || 'A',
      spend: Number(spend || 1),
      inserted_date: new Date(),
      ...(metaData ? { meta_data: metaData } : {}),
    },
  })
}

export async function validateApiKey(apiKey: string): Promise<ApiErrorCode | undefined> {
  if (!apiKey) return 'PUBLIC_API_KEY_DOES_NOT_EXIST'
  if (!parseApiKey(apiKey).isValid) return 'PUBLIC_API_KEY_IS_NOT_IN_VALID_FORMAT'

  const key = await prisma.cas__organisation_api_key.findFirst({
    select: { id: true, organisation_id: true, is_active: true, is_deleted: true, expiration_date: true },
    where: { api_key: apiKey },
  })
  if (!key) return 'PUBLIC_API_KEY_DOES_NOT_EXIST'
  if (key.is_deleted) return 'PUBLIC_API_KEY_HAS_BEEN_DELETED'
  if (!key.is_active) return 'PUBLIC_API_KEY_IS_NOT_ACTIVE'
  if (isDateBeforeNow(key.expiration_date)) return 'PUBLIC_API_KEY_HAS_BEEN_EXPIRED'
  API_KEY_TO_ID_CACHE[apiKey] = key.id
  API_KEY_CONTEXT = apiKey

  await incrementKeyUsage(key.id)
  return
}

export async function resolveApiKeyIdByKey(apiKey: string): Promise<bigint> {
  const keyId: bigint | undefined = API_KEY_TO_ID_CACHE[apiKey as keyof typeof API_KEY_TO_ID_CACHE]
  if (keyId) return keyId

  const selectedKey = await prisma.cas__organisation_api_key.findFirstOrThrow({
    select: { id: true },
    where: { api_key: apiKey },
  })
  API_KEY_TO_ID_CACHE[apiKey] = selectedKey.id

  return selectedKey.id
}

export async function computeUsage(r: ApiUsageRequest): Promise<ApiUsageReport[]> {
  const keyIds = await resolveUsageKeyIds(r)
  const spendRaw = await prisma.$queryRaw<ApiUsageReport[]>`
   SELECT
     u.operation_class AS operation,
     SUM(u.spend) AS spend,
     COUNT(u.spend) AS operations
   FROM core__api_key_usage u
   WHERE u.key_id IN (${Prisma.join(keyIds)})
   GROUP BY u.operation_class`;

  return spendRaw.map(
    (record): ApiUsageReport => ({
      operation: record.operation,
      spend: Number(record.spend),
      operations: Number(record.operations),
    }),
  )
}

async function resolveUsageKeyIds(r: ApiUsageRequest): Promise<bigint[]> {
  if (!('apiKey' in r || 'userId' in r || 'organisationId' in r)) return []

  const keyListRaw = await prisma.cas__organisation_api_key.findMany({
    select: { id: true },
    where: {
      ...('apiKey' in r ? { api_key: r.apiKey } : {}),
      ...('userId' in r ? { user_id: r.userId } : {}),
      ...('organisationId' in r ? { organisation_id: r.organisationId } : {}),
    },
  });

  return keyListRaw.map((key) => key.id)
}

async function incrementKeyUsage(keyId: bigint) {
  await prisma.$executeRaw`
    UPDATE cas__organisation_api_key
    SET used_count_today = used_count_today + 1
    WHERE id = ${keyId}`
}
