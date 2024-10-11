import { prisma } from '@nmit-coursition/db'
import { webhookEventHandler } from '@nmit-coursition/payments'
import { PaymentStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const rawBody = await request.text()
  const data = await webhookEventHandler({
    rawBody,
    request,
    customData: {
      condition: (data) => {
        return (
          data.data.attributes.status === 'paid' &&
          data.meta.custom_data?.platform === 'coursition' &&
          data.meta.custom_data?.sub_type === 'lifetime'
        )
      },
      callback: async (email) => {
        await prisma.user.update({
          where: { email },
          data: {
            paymentStatus: PaymentStatus.LIFETIME,
          },
        })
        revalidatePath('/')
        return { success: true, message: 'user.roles.upated' }
      },
    },
  })
  return NextResponse.json(data)
}
