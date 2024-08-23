'use client'

import * as React from 'react'

import { Button } from '@nmit-coursition/design-system'
import { ImSpinner8 } from 'react-icons/im'
import { generateCheckout } from '../app/actions'
import { useMounted } from '../app/hooks/useMounted'

export const BuyLifetime = () => {
  const isMounted = useMounted()
  const [isRedirecting, setIsRedirecting] = React.useState(false)

  const openPaymentDialog = async () => {
    window.createLemonSqueezy()
    setIsRedirecting(true)
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
              setIsRedirecting(false)
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

  if (!isMounted) return <></>

  return (
    <div>
      <Button
        onClick={openPaymentDialog}
        className='mt-4 flex w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
      >
        <span>Buy Lifetime</span>
        {isRedirecting && <ImSpinner8 className='animate-spin text-xl' />}
      </Button>
    </div>
  )
}
