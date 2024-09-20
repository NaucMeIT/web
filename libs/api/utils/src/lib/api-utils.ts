import { prisma } from '@nmit-coursition/db'
import { isDateBeforeNow } from '@nmit-coursition/utils'
import { parseApiKey } from '../api'
import type { ApiErrorCode } from '../errorList'

export function reportUsage(apiKey: string, duration: number, type: 'video' | 'document' | 'web') {
  // eslint-disable-next-line no-console -- will be replaced with real usage reporting
  console.log(`API Key ${apiKey} used ${duration} on ${type}.`)
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

  await incrementKeyUsage(key.id)
}

async function incrementKeyUsage(keyId: number) {
  await prisma.$executeRaw`
    UPDATE cas__organisation_api_key
    SET used_count_today = used_count_today + 1
    WHERE id = ${keyId}`
}
