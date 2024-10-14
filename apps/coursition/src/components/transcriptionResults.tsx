import { Actions, Tabs } from '@nmit-coursition/ui/design-system'
import type { ReactNode } from 'react'

interface Props {
  raw: string | undefined
  srt: string | undefined
  vtt: string | undefined
}

const TranscribeResult = ({ children }: { children: ReactNode }) => {
  return (
    <Actions.DefaultActionBar>
      <pre className='w-full h-auto max-h-72 overflow-x-auto whitespace-pre-wrap bg-gray-100 p-2 rounded break-words break-keep'>
        {children}
      </pre>
    </Actions.DefaultActionBar>
  )
}

export const TranscriptionResults = ({ raw, srt, vtt }: Props) => {
  const tabValues = [
    ...(srt ? [{ value: 'srt', displayText: 'SRT', children: <TranscribeResult>{srt}</TranscribeResult> }] : []),
    ...(vtt ? [{ value: 'vtt', displayText: 'VTT', children: <TranscribeResult>{vtt}</TranscribeResult> }] : []),
    ...(raw ? [{ value: 'raw', displayText: 'Raw', children: <TranscribeResult>{raw}</TranscribeResult> }] : []),
  ]

  return (
    <>
      <h2 className='text-xl font-bold mb-2'>Results:</h2>
      <Tabs values={tabValues} />
    </>
  )
}
