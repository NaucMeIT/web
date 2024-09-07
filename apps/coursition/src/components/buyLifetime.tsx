'use client'

import * as React from 'react'

import { Button } from '@nmit-coursition/design-system'
import type { ButtonProps } from '@nmit-coursition/ui/primitives'
import { cn } from '@nmit-coursition/ui/utils'
import { ArrowUpLeft } from 'lucide-react'
import { generateCheckout } from '../app/actions'
import { useMounted } from '../app/hooks/useMounted'

interface Props extends ButtonProps {
  withIcon: boolean
}

export const BuyLifetime = ({ className, withIcon = true, ...rest }: Props) => {
  const isMounted = useMounted()

  const openPaymentDialog = async () => {
    window.createLemonSqueezy()
    const checkout = await generateCheckout()
    window.LemonSqueezy.Url.Open(checkout?.data?.data.attributes.url || '')
  }

  React.useEffect(() => {
    const eventHandler = async () => {
      if (isMounted) {
        window.LemonSqueezy?.Setup({
          eventHandler: (event) => {
            console.log({ event })
            if (event?.event === 'Checkout.Success') {
              window.LemonSqueezy.Url.Close()
              const lsLoaderElement = document.getElementsByClassName('lemonsqueezy-loader')[0]
              document.body.removeChild(lsLoaderElement)
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
      onClick={openPaymentDialog}
      className={cn(
        'h-[62px] py-1 pl-3 pr-1 max-w-[263px] rounded-none bg-purple-700 hover:bg-purple-700/90 flex gap-2',
        className,
      )}
    >
      <div className='font-semibold text-[24px]'>Get lifetime deal</div>
      {withIcon && (
        <div className='bg-white px-4 h-full flex items-center justify-center flex-1'>
          <ArrowUpLeft className='rotate-[85deg] text-purple-700' />
        </div>
      )}
    </Button>
  )
}
