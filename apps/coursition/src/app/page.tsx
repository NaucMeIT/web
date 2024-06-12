'use client'

import { getSignedUrl } from '@nmit-coursition/ai'
import React from 'react'

function UploadSignedUrl() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const form = event.currentTarget
      const data = new FormData(form)
      const file = data.get('file') as File
      const url = await getSignedUrl(file.name)

      await fetch(url, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <>
      <h1 className='text-gray-600 text-xl m-8'>Upload Using Signed URL</h1>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' />
        <button type='submit' className='border border-slate-200 shadow-md hover:bg-slate-100 px-4 py-2 rounded-md'>
          Upload
        </button>
      </form>
    </>
  )
}

const acceptedFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'

export default function Index() {
  return (
    <div>
      <h1>File Parse</h1>
      <form action='/api/quiz/parse' method='POST' encType='multipart/form-data'>
        <input type='file' id='file' name='file' accept={acceptedFileTypes} />
        <button type='submit'>Submit</button>
      </form>
      <h1>Generate quiz</h1>
      <form action='/api/quiz/generate' method='POST' encType='multipart/form-data'>
        <textarea id='content' name='content' />
        <button type='submit'>Submit</button>
      </form>
      <UploadSignedUrl />
    </div>
  )
}
