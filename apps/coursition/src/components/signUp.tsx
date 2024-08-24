'use client'

// biome-ignore lint/style/useImportType: <explanation>
import * as React from 'react'

import { Button, Input } from '@nmit-coursition/design-system'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createUser } from '../app/actions'
import { GoogleSignIn } from './googleSignIn'

export const SignUp = () => {
  const { push } = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const formdata = new FormData(e.currentTarget) as any
    const email = formdata.get('email')
    const password = formdata.get('password')
    const result = await createUser({ email, password })

    if (result.success === false) {
      // todo: display toast from sooner
      return alert('something went wrong while creating your account')
    }

    push('/sign-in')
  }

  return (
    <div className='container px-12 h-screen w-screen flex flex-col gap-8 items-center justify-center'>
      <h2 className='font-semibold text-2xl'>Sign up for courstion</h2>
      <form className='flex flex-col gap-4 w-full max-w-4xl mx-auto' onSubmit={handleSubmit}>
        <Input placeholder='johndoe@gmail.com' id='email' label='Email' type='email' name='email' />
        <Input placeholder='' id='password' label='Password' type='password' name='password' />

        <Button type='submit'>Sign up</Button>
        <GoogleSignIn />
        <div className='w-full flex items-center justify-center gap-2'>
          <p>Already have an account?</p>
          <Link href='/sign-in' className='underline underline-offset-2'>
            Sign in
          </Link>
        </div>
      </form>
    </div>
  )
}
