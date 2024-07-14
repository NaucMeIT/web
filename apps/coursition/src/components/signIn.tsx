'use client'

import { Button } from '@nmit-coursition/design-system'
import { signIn } from 'next-auth/react'

export const SignIn = () => {
  return (
    <div className='h-screen mx-auto max-w-4xl flex flex-col gap-8 items-center justify-center'>
      <Button onClick={async () => await signIn('google', { callbackUrl: '/' })}>Sign in with google</Button>
    </div>
  )
}
