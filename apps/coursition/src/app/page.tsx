'use client'

import React from 'react'
import { Button } from '@nmit-coursition/primitives'

const acceptedFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'

export default function Index() {
  return (
    <div className='p-4 bg-white shadow rounded-md'>
      <h2 className='text-2xl font-bold mb-4'>Upload a File</h2>
      <form className='space-y-4'>
        <div>
          <label htmlFor='file' className='block font-medium text-gray-700 mb-1'>
            Choose a file
          </label>
          <input
            type='file'
            id='file'
            name='file'
            accept={acceptedFileTypes}
            className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
          />
        </div>
        <Button
          type='submit'
          className='w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-md'
        >
          Send
        </Button>
      </form>
    </div>
  )
}
