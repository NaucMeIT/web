'use client'

import { Button, Input } from '@nmit-coursition/design-system'
import { signIn } from 'next-auth/react'

export const SignIn = () => {
  return (
    <form
      className='h-screen mx-auto max-w-4xl flex flex-col gap-8 items-center justify-center'
      action={(formdata) => signIn('credentials', { callbackUrl: '/' }, formdata as unknown as Record<string, string>)}
    >
      <Input
        id='username'
        type='text'
        label='Username'
        placeholder='coursition'
        subtext='please use the placeholder value'
      />
      <Input
        id='password'
        type='text'
        label='Password'
        placeholder='12345678'
        subtext='please use the placeholder value'
      />
      <Button>Sign in</Button>
    </form>
  )
}
