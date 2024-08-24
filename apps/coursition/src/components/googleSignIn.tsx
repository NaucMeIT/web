import { Button } from '@nmit-coursition/design-system'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import * as React from 'react'

export const GoogleSignIn = () => {
  const [isLoading, setIsLoading] = React.useState(false)

  return (
    <Button
      onClick={async () => {
        setIsLoading(true)
        await signIn('google', { callbackUrl: '/' })
      }}
      className='w-ful text-white font-medium py-2 px-4 rounded-md'
    >
      <span>Sign in with google</span>
      {isLoading && <Loader className='animate-spin text-sm ml-1' />}
    </Button>
  )
}
