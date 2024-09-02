'use client'

import { generateQuiz, getResult, getTranscript, uploadFile, waitUntilJobIsDone } from '@nmit-coursition/ai'
import { Accordion, Button, Checkbox, Input } from '@nmit-coursition/design-system'
import { zfd } from '@nmit-coursition/utils'
import { useActionState, useState } from 'react'
import { z } from 'zod'
import { BuyLifetime } from '../components/buyLifetime'
import { Header } from '../components/header'
import { StatusDisplay } from '../components/statusDisplay'

const acceptedDocumentFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'
const acceptedMediaFileTypes = 'video/*,audio/*'
const acceptedFileTypes = `${acceptedDocumentFileTypes},${acceptedMediaFileTypes}`

const fileSchema = zfd.formData({
  file: zfd.file(),
  outputLang: z.string().optional(),
  amountQuestions: zfd.numeric().optional(),
  amountAnswers: zfd.numeric().optional(),
  allowMultiple: zfd.checkbox().optional(),
  precisionMode: zfd.checkbox().optional(),
  contentDescription: z.string().optional(),
  inputLang: z.string().optional(),
  action: z.enum(['convert', 'generate']),
})

// biome-ignore lint/suspicious/noExplicitAny: It's broken in Next.js if correctly typed
const initialState: any = {
  text: null,
  quiz: null,
}

export default function Index() {
  const [status, setStatus] = useState<'idle' | 'upload' | 'parse' | 'generate' | 'done'>('idle')

  const handleSubmit = async (_: unknown, formData: FormData) => {
    setStatus('upload')
    const { file, outputLang, amountQuestions, amountAnswers, action, precisionMode, contentDescription, inputLang } =
      fileSchema.parse(formData)
    let text = ''
    if (acceptedDocumentFileTypes.includes(file.type)) {
      const config = { precisionMode, contentDescription, inputLang }
      const { id, status } = await uploadFile(file, config)

      setStatus('parse')
      await waitUntilJobIsDone(id, status)
      const { markdown } = await getResult(id)
      text = markdown
    } else {
      setStatus('parse')
      const { raw } = await getTranscript(file)
      text = raw
    }

    if (action === 'convert') {
      setStatus('done')
      return { text }
    }

    setStatus('generate')
    const quiz = await generateQuiz(text, { outputLang, amountQuestions, amountAnswers })
    setStatus('done')
    return { text, quiz }
  }

  const [state, formAction] = useActionState(handleSubmit, initialState)

  return (
    <div className='flex flex-col gap-6 justify-center items-center h-screen'>
      <Header />
      <div className='p-4 shadow rounded-md max-w-2xl w-full'>
        {status === 'idle' && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Upload a File</h1>
            <form className='space-y-4' action={formAction}>
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
              <Accordion
                items={[
                  {
                    title: 'Advanced Options',
                    content: (
                      <div className='flex gap-3 flex-col'>
                        <Checkbox
                          label='Precision mode'
                          id='precisionMode'
                          subtext='Enable for more precise document parsing. It can be handy for handwritten notes and other normally unprocessable files. Requires an OpenAI API key.'
                        />
                        <Input
                          label='OpenAI API Key'
                          placeholder='sk-...'
                          type='text'
                          id='apiKey'
                          subtext='Your OpenAI API key for more precise document parsing, necessary for precision mode'
                        />
                        <Input
                          label='Content description'
                          placeholder='My handwritten notes from the lecture about biology.'
                          type='text'
                          id='contentDescription'
                          subtext='A short description of the document content to help with processing it.'
                        />
                        <Input
                          label='Input language'
                          placeholder='en'
                          type='text'
                          id='inputLang'
                          subtext='The language of the uploaded document. Should be a two-letter language code, e.g. cs, en, de...'
                        />
                        <hr />
                        <Input label='Output language' placeholder='English' type='text' id='outputLang' />
                        <Input
                          label='Amount of questions'
                          subtext='How many questions should be generated in total?'
                          placeholder='5'
                          type='number'
                          id='amountQuestions'
                        />
                        <Input
                          label='Amount of answers'
                          subtext='How many answers should be generated per question?'
                          placeholder='4'
                          type='number'
                          id='amountAnswers'
                        />
                        <Checkbox
                          label='Allow multiple answers'
                          subtext='If enabled there might be multiple correct answers but not always.'
                          id='allowMultiple'
                        />
                      </div>
                    ),
                  },
                ]}
              />
              <div className='flex gap-4'>
                <Button
                  type='submit'
                  name='action'
                  value='convert'
                  className='flex-1 bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md'
                >
                  Convert
                </Button>
                <Button
                  type='submit'
                  name='action'
                  value='generate'
                  className='flex-1 bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-md'
                >
                  Convert & Generate Quiz
                </Button>
              </div>
            </form>
          </>
        )}
        {status !== 'idle' && status !== 'done' && (
          <StatusDisplay
            states={[
              { key: 'upload', text: 'Uploading the file' },
              { key: 'parse', text: 'Extracting information' },
              { key: 'generate', text: 'Generating questions' },
            ]}
            status={status}
          />
        )}
        {status === 'done' && (
          <div>
            <h2 className='text-xl font-bold mb-2'>Results:</h2>
            {state.text && (
              <div className='mb-4'>
                <h3 className='text-lg font-semibold mb-1'>Text:</h3>
                <pre className='w-full h-auto max-h-60 overflow-auto bg-gray-100 p-2 rounded'>{state.text}</pre>
              </div>
            )}
            {state.quiz && (
              <div>
                <h3 className='text-lg font-semibold mb-1'>Quiz:</h3>
                <pre className='w-full h-auto max-h-60 overflow-auto bg-gray-100 p-2 rounded'>
                  {JSON.stringify(state.quiz, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        <BuyLifetime />
      </div>
    </div>
  )
}
