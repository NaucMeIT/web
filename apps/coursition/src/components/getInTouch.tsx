'use client'

import { Button, Input, Textarea } from '@nmit-coursition/design-system'

export const GetInTouch = () => {
  return (
    <form className='flex flex-col gap-4'>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Input id='firstName' placeholder='First Name' label='' type='text' className='py-6' />
        <Input id='lastName' placeholder='Last Name' label='' type='text' className='py-6' />
        <Input id='email' placeholder='Email' label='' type='email' className='py-6' />
        <Input id='phoneNumber' placeholder='Phone Number' label='' type='tel' className='py-6' />
      </div>
      <Textarea id='comment' placeholder='Comment' label='' rows={5} />
      <Button className='w-full bg-purple-700 hover:bg-purple-700/90' type='submit'>
        Talk with us
      </Button>
    </form>
  )
}
