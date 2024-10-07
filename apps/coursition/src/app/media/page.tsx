'use client'

import { getTranscript } from '@nmit-coursition/ai'
import { Accordion, Actions, Button, Textarea } from '@nmit-coursition/design-system'
import { useSignal } from '@preact/signals-react/runtime'
import React, { useActionState } from 'react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { StatusDisplay } from '../../components/statusDisplay'
import { TranscriptionResults } from '../../components/transcriptionResults'

const acceptedMediaFileTypes = 'video/*,audio/*'
const acceptedFileTypes = `${acceptedMediaFileTypes}`

const fileSchema = zfd.formData({
  file: zfd.file(),
  keywords: z.string().optional(),
})

const initialState = {
  raw: '',
  srt: '',
  vtt: '',
}

const accordionItems = [
  {
    title: 'Advanced Options',
    content: (
      <div className='flex gap-3 flex-col w-full'>
        <Textarea
          label='Difficult words'
          placeholder='ChatGPT, Claude, Zig'
          id='keywords'
          subtext='Unusual words or phrases that may be difficult to transcribe. Separate with commas. Avoid putting common words.'
        />
      </div>
    ),
  },
]

const statusStates = [
  { key: 'upload', text: 'Uploading media' },
  { key: 'parse', text: 'Transcribing' },
]
export default function Index() {
  const status = useSignal<'idle' | 'upload' | 'parse' | 'done'>('idle')

  const handleSubmit = async (formData: FormData) => {
    status.value = 'upload'
    const { file, keywords } = fileSchema.parse(formData)
    status.value = 'parse'
    const keywordsArray = keywords ? keywords.split(',').map((word) => `${word}:5`) : []
    const { raw, srt, vtt } = await getTranscript(file, keywordsArray)
    status.value = 'done'
    return { raw, srt, vtt }
  }

  const [state, formAction] = useActionState((_: unknown, formData: FormData) => handleSubmit(formData), initialState)

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-4 shadow rounded-md max-w-2xl w-full'>
        {status.value === 'idle' && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Upload media</h1>
            <form className='space-y-4' action={formAction}>
              <div>
                <label htmlFor='file' className='block font-medium text-gray-700 mb-1'>
                  Choose a media file
                </label>
                <input
                  type='file'
                  id='file'
                  name='file'
                  accept={acceptedFileTypes}
                  className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100'
                />
              </div>
              <Accordion items={accordionItems} />
              <div className='flex gap-4'>
                <Button
                  type='submit'
                  className='flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
                >
                  Transcribe
                </Button>
              </div>
            </form>
          </>
        )}
        {status.value !== 'idle' && status.value !== 'done' && (
          <StatusDisplay states={statusStates} status={status.value} />
        )}
        {status.value === 'done' && (
          <div>
            <h2 className='text-xl font-bold mb-2'>Results:</h2>
            {state.raw && (
              <div className='mb-4'>
                <h3 className='text-lg font-semibold mb-1'>Transcript:</h3>
                <Actions.DefaultActionBar>
                  <pre className='w-full h-auto max-h-60 overflow-auto bg-gray-100 p-2 rounded'>{state.raw}</pre>
                </Actions.DefaultActionBar>
              </div>
            )}
            {state.srt && (
              <div className='mb-4'>
                <h3 className='text-lg font-semibold mb-1'>SRT subtitles:</h3>
                <Actions.DefaultActionBar>
                  <pre className='w-full h-auto max-h-60 overflow-auto bg-gray-100 p-2 rounded'>{state.srt}</pre>
                </Actions.DefaultActionBar>
              </div>
            )}
            {state.vtt && (
              <div className='mb-4'>
                <h3 className='text-lg font-semibold mb-1'>VTT subtitles:</h3>
                <Actions.DefaultActionBar>
                  <pre className='w-full h-auto max-h-60 overflow-auto bg-gray-100 p-2 rounded'>{state.vtt}</pre>
                </Actions.DefaultActionBar>
              </div>
            )}
          </div>
        )}
        {status.value === 'done' && <TranscriptionResults raw={state.raw} srt={state.srt} vtt={state.vtt} />}
      </div>
    </div>
  )
}
