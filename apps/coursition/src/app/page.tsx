'use client'

import { generateQuiz, getResult, parseFile, waitUntilJobIsDone } from '@nmit-coursition/ai'
import { Accordion, Button, Checkbox, Input } from '@nmit-coursition/design-system'
import { zfd } from '@nmit-coursition/utils'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'
import { z } from 'zod'
import { StatusDisplay } from '../components/statusDisplay'

const acceptedFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'

const fileSchema = zfd.formData({
  file: zfd.file(),
  outputLang: z.string().optional(),
  amountQuestions: zfd.numeric().optional(),
  amountAnswers: zfd.numeric().optional(),
  allowMultiple: z.boolean().optional(),
})

const initialState: any = {
  quiz: null,
}

export default function Index() {
  const [status, setStatus] = useState<'idle' | 'upload' | 'parse' | 'generate' | 'done'>('idle')
  const handleSubmit = async (_: any, formData: FormData) => {
    setStatus('upload')
    const { file, outputLang, amountQuestions, amountAnswers } = fileSchema.parse(formData)
    const { id, status } = await parseFile(file)

    setStatus('parse')
    await waitUntilJobIsDone(id, status)
    const markdown = await getResult(id)

    setStatus('generate')
    const quiz = await generateQuiz(markdown, { outputLang, amountQuestions, amountAnswers })
    setStatus('done')
    return { quiz }
  }
  const [state, formAction] = useFormState(handleSubmit, initialState)

  return (
    <div className='flex justify-center items-center h-screen'>
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
              <Button
                type='submit'
                className='w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-md'
              >
                Generate quiz
              </Button>
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
        {status === 'done' && <pre className='w-full h-auto'>{JSON.stringify(state.quiz, null, 2)}</pre>}
      </div>
    </div>
  )
}
