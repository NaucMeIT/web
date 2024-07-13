import { webhookEventHandler } from '@nmit-coursition/payments'
import { type NextRequest, NextResponse } from 'next/server'

export const POST = async (request: NextRequest) => {
  const rawBody = await request.text()
  const data = await webhookEventHandler({
    rawBody,
    request,
    customData: {
      callback: () => void console.log('user granted lifetime access'),
      event: 'order_created',
    },
  })
  return NextResponse.json(data)
}
