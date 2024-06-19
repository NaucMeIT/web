'use client'

import React from 'react'

const acceptedFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'

export default function Index() {
  return (
    <div>
      <h1 className='text-gray-600 text-xl m-8'>Save + transcribe video</h1>
      <form action='/api/quiz/save' method='POST' encType='multipart/form-data'>
        <input type='file' id='file' name='file' />
        <button type='submit'>Submit</button>
      </form>
      <h1 className='text-gray-600 text-xl m-8'>File Parse</h1>
      <form action='/api/quiz/parse' method='POST' encType='multipart/form-data'>
        <input type='file' id='file' name='file' accept={acceptedFileTypes} />
        <button type='submit'>Submit</button>
      </form>
      <h1 className='text-gray-600 text-xl m-8'>Generate quiz</h1>
      <form action='/api/quiz/generate' method='POST' encType='multipart/form-data'>
        <textarea id='content' name='content' />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}
