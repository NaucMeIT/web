import { prisma } from '@nmit-coursition/db'
import type { cas__user } from '@prisma/client'

interface User {
  id: string
  email: string
  profilePictureUrl?: string
  firstName?: string
  lastName?: string
  createdAt: string
  updatedAt: string
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

  return await prisma.cas__user.update({
    where: { id: user.id },
    data: {
      workos_id: userData.id,
      email: userData.email,
      inserted_date: new Date(userData.createdAt),
      updated_date: new Date(userData.updatedAt),
      synced_date: new Date(),
      first_name: fuckEmptyValue(userData.firstName || ''),
      last_name: fuckEmptyValue(userData.lastName || ''),
      avatar_url: fuckEmptyValue(userData.profilePictureUrl || ''),
    },
  })
}

function fuckEmptyValue(value: string): string {
  // TODO: Here must be a UNDEFINED. Fuck it
  const empty = '' as unknown as string
  return value || empty
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
