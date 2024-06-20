'use client'

import { generateQuiz, getResult, parseFile, waitUntilJobIsDone } from '@nmit-coursition/ai'
import { Button } from '@nmit-coursition/ui/primitives'
import { zfd } from '@nmit-coursition/utils'
import React, { useState } from 'react'
import { useFormState } from 'react-dom'

const acceptedFileTypes =
  'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.oasis.opendocument.text,application/vnd.oasis.opendocument.presentation,text/html,image/x-png,image/jpeg,image/gif'

const fileSchema = zfd.formData({ file: zfd.file() })

const initialState: any = {
  quiz: null,
}

function CircleCheckIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <path d='m9 12 2 2 4-4' />
    </svg>
  )
}

function LoaderIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 2v4' />
      <path d='m16.2 7.8 2.9-2.9' />
      <path d='M18 12h4' />
      <path d='m16.2 16.2 2.9 2.9' />
      <path d='M12 18v4' />
      <path d='m4.9 19.1 2.9-2.9' />
      <path d='M2 12h4' />
      <path d='m4.9 4.9 2.9 2.9' />
    </svg>
  )
}

function MonitorStopIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M12 17v4' />
      <path d='M8 21h8' />
      <rect x='2' y='3' width='20' height='14' rx='2' />
      <rect x='9' y='7' width='6' height='6' rx='1' />
    </svg>
  )
}

type State<T extends string> = {
  key: T
  text: string
}

type StatusDisplayProps<T extends string> = {
  states: Array<State<T>>
  status: NoInfer<T>
}

const StatusDisplay = <T extends string>({ states, status }: StatusDisplayProps<T>) => {
  const currentIndex = states.findIndex((state) => state.key === status)

  const renderStatusCard = (state: { text: string; key: string }, index: number) => {
    let icon, textClass
    if (index < currentIndex) {
      icon = <CircleCheckIcon className='text-green-500 h-6 w-6' />
      textClass = 'text-gray-700'
    } else if (index === currentIndex) {
      icon = <LoaderIcon className='text-gray-500 h-6 w-6 animate-spin' />
      textClass = 'text-gray-700'
    } else {
      icon = <MonitorStopIcon className='text-gray-400 h-6 w-6' />
      textClass = 'text-gray-500'
    }

    return (
      <div key={state.key} className='p-4 bg-white flex items-center space-x-4'>
        {icon}
        <span className={`text-lg font-medium ${textClass}`}>{state.text}</span>
      </div>
    )
  }

  return <div>{states.map((state, index) => renderStatusCard(state, index))}</div>
}

export default function Index() {
  const [status, setStatus] = useState<'idle' | 'upload' | 'parse' | 'generate' | 'done'>('idle')
  const handleSubmit = async (_: any, formData: FormData) => {
    setStatus('upload')
    const { file } = fileSchema.parse(formData)
    const { id, status } = await parseFile(file)

    setStatus('parse')
    await waitUntilJobIsDone(id, status)
    const markdown = await getResult(id)

    setStatus('generate')
    const quiz = await generateQuiz(markdown, { outputLang: 'English', amountQuestions: 2, amountAnswers: 3 })
    setStatus('done')
    return { quiz }
  }
  const [state, formAction] = useFormState(handleSubmit, initialState)

  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='p-4 shadow rounded-md max-w-2xl w-full'>
        {status === 'idle' && (
          <>
            <h2 className='text-2xl font-bold mb-4'>Upload a File</h2>
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
              <Button
                type='submit'
                className='w-full bg-violet-500 hover:bg-violet-600 text-white font-medium py-2 px-4 rounded-md'
              >
                Send
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
