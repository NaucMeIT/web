'use client'

import * as React from 'react'

import { Button } from '@nmit-coursition/design-system'
import { useRouter } from 'next/navigation'
import { ImSpinner8 } from 'react-icons/im'
import { generateCheckout } from '../app/actions'

export const BuyLifetime = () => {
  const router = useRouter()
  const [isRedirecting, setIsRedirecting] = React.useState(false)

  const handleCheckout = async () => {
    setIsRedirecting(true)
    const checkout = await generateCheckout()
    router.push(checkout?.data?.data.attributes.url || '')
  }

  return (
    <Button
      onClick={handleCheckout}
      className='mt-4 flex w-full gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
    >
      <span>Buy Lifetime</span>
      {isRedirecting && <ImSpinner8 className='animate-spin text-xl' />}
    </Button>
  )
}
