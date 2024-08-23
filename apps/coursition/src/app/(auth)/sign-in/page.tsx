import { Input } from '@nmit-coursition/design-system'

export default async function SignInPage() {
  return (
    <div className='container px-12 h-screen w-screen flex items-center justify-center'>
      <form>
        <div>
          <Input placeholder='johndoe@gmail.com' id='email' label='Email' type='email' />
        </div>
      </form>
    </div>
  )
}
