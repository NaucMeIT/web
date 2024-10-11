'use client'

import * as React from 'react'

import { Button, type ButtonProps } from '@nmit-coursition/ui/design-system'
import { cn } from '@nmit-coursition/ui/utils'
import { ArrowUpLeft } from 'lucide-react'
import { generateCheckout } from '../app/actions'
import { useMounted } from '../app/hooks/useMounted'

type Props = ButtonProps & {
  withIcon?: boolean
}

export const BuyLifetime = ({ className, ...rest }: Props) => {
  const isMounted = useMounted()

  const openPaymentDialog = async () => {
    window.createLemonSqueezy()
    const checkout = await generateCheckout()
    window.LemonSqueezy.Url.Open(checkout?.data?.data.attributes.url || '')
  }

  React.useEffect(() => {
    const eventHandler = () => {
      if (isMounted) {
        window.LemonSqueezy?.Setup({
          eventHandler: (event) => {
            if (event?.event === 'Checkout.Success') {
              window.LemonSqueezy.Url.Close()
              const lsLoaderElement = document.querySelectorAll('.lemonsqueezy-loader')[0]
              lsLoaderElement && document.body.removeChild(lsLoaderElement)
            }
          },
        })
      }
    }

    eventHandler()
  }, [isMounted])

  return (
    <Button
      {...rest}
      type='button'
      onClick={openPaymentDialog}
      className={cn('h-16 rounded-none flex gap-2', className)}
      icon={
        <div className='bg-white px-4 h-full flex items-center justify-center flex-1'>
          <ArrowUpLeft className='rotate-[85deg]' />
        </div>
      }
      iconPosition='right'
    >
      <div className='font-semibold text-2xl'>Get lifetime deal</div>
    </Button>
  )
}
