'use client'

import * as React from 'react'

import { Button, Input } from '@nmit-coursition/ui/design-system'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import { GoogleSignIn } from './googleSignIn'

export const SignIn = () => {
  const searchParams = useSearchParams()
  const errorMessage = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formdata = new FormData(e.currentTarget)
    const email = formdata.get('email')
    const password = formdata.get('password')
    await signIn('credentials', { callbackUrl: '/', email, password })
  }

  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return (
    <div className='container px-12 h-screen w-screen flex flex-col gap-8 items-center justify-center'>
      <h2 className='font-semibold text-2xl'>Sign in to courstion</h2>
      <form className='flex flex-col gap-4 w-full max-w-4xl mx-auto' onSubmit={handleSubmit}>
        <Input placeholder='johndoe@gmail.com' id='email' label='Email' type='email' name='email' />
        <Input placeholder='' id='password' label='Password' type='password' name='password' />

        <Button type='submit'>Sign in</Button>
      </form>

      <GoogleSignIn />
      <div className='w-full flex items-center justify-center gap-2'>
        <p>Dont have an account yet?</p>
        <Link href='/sign-up' className='underline underline-offset-2'>
          Sign up
        </Link>
      </div>
    </div>
  )
}
