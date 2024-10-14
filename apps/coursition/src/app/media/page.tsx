'use client'

import { getTranscript } from '@nmit-coursition/ai'
import { Accordion, Button, Textarea } from '@nmit-coursition/ui/design-system'
import { useSignal } from '@preact/signals-react/runtime'
import { useActionState } from 'react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { FileDropper } from '../../components/fileDropper'
import { StatusDisplay } from '../../components/statusDisplay'
import { TranscriptionResults } from '../../components/transcriptionResults'

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
              <FileDropper
                idleMessage="Drag 'n' drop some files here, or click to select files"
                dropZoneMessage='Drop the files here ...'
                className='border max-w-2xl mx-auto'
                inputName='file'
                maxFiles={1}
                accept={{ 'video/*': [], 'audio/*': [] }}
              />
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
        {status.value === 'done' && <TranscriptionResults raw={state.raw} srt={state.srt} vtt={state.vtt} />}
      </div>
    </div>
  )
}
