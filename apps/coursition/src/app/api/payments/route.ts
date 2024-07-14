import { webhookEventHandler } from '@nmit-coursition/payments'
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
        /**
         * Todo: update user payment status
         */
      },
    },
  })
  return NextResponse.json(data)
}
