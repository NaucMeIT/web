import { prisma } from '@nmit-coursition/db'
import { randomStringGenerator } from '@nmit-coursition/utils'
import type { cas__user } from '@prisma/client'

interface User {
  id: string
  email: string
  profilePictureUrl?: string | null
  firstName?: string | null
  lastName?: string | null
  createdAt: string
  updatedAt: string
}

export async function validateSessionToken(sessionToken: string): Promise<string> {
  if (!sessionToken) return ''
  const userIdentityRecord = await prisma.cas__user_identity.findFirst({
    select: { user_id: true },
    where: { session: sessionToken, expired: false, expiration_date: { lte: new Date() } },
  })
  if (!userIdentityRecord) return ''

  const apiKeyRecord = await prisma.cas__organisation_api_key.findFirst({
    select: { api_key: true },
    where: { user_id: userIdentityRecord.user_id },
  })

  return apiKeyRecord?.api_key || (await createApiKey(userIdentityRecord.user_id))
}

export async function createApiKey(userId: bigint): Promise<string> {
  const user = await prisma.cas__user.findFirstOrThrow({ where: { id: userId } })
  const apiKey = await prisma.cas__organisation_api_key.create({
    data: {
      organisation_id: user.organisation_id,
      api_key: `PROD${randomStringGenerator(28)}`,
      used_count_today: 0,
      user_id: userId,
      is_active: true,
      is_deleted: false,
      inserted_date: new Date(),
      expiration_date: (() => {
        const date = new Date()
        date.setDate(date.getDate() + 7)
        return date
      })(),
      last_used_date: new Date(),
    },
  })

  return apiKey.api_key
}

export async function updateUser(userData: User, organisationId: number): Promise<cas__user> {
  const user =
    (await prisma.cas__user.findFirst({
      where: {
        AND: [{ OR: [{ workos_id: userData.id }, { email: userData.email }] }, { organisation_id: organisationId }],
      },
    })) ||
    (await prisma.cas__user.create({
      data: {
        organisation_id: organisationId,
        email: userData.email,
        inserted_date: new Date(userData.createdAt),
        updated_date: new Date(userData.updatedAt),
        synced_date: new Date(),
        workos_id: userData.id,
      },
    }))

  return prisma.cas__user.update({
    where: { id: user.id },
    data: {
      workos_id: userData.id,
      email: userData.email,
      inserted_date: new Date(userData.createdAt),
      updated_date: new Date(userData.updatedAt),
      synced_date: new Date(),
      first_name: userData.firstName || null,
      last_name: userData.lastName || null,
      avatar_url: userData.profilePictureUrl || null,
    },
  })
}

export async function storeUserSession(internalUserId: bigint, session: string) {
  if (!session) return
  await prisma.cas__user_identity.create({
    data: {
      user_id: internalUserId,
      session: session,
      expired: false,
      inserted_date: new Date(),
      expiration_date: (() => {
        const date = new Date()
        date.setHours(date.getHours() + 2)
        return date
      })(),
    },
  })
}

export async function invalidateSession(session: string) {
  await prisma.cas__user_identity.updateMany({
    where: { session },
    data: { expired: true },
  })
}
