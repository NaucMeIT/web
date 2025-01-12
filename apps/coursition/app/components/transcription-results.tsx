import { TabPane, Tabs } from '@douyinfe/semi-ui'
import { Actions } from '@nmit-coursition/ui/design-system'
import type { FileFormat } from '@nmit-coursition/utils'
import type { ReactNode } from 'react'

interface Props {
  raw: string | undefined
  srt: string | undefined
  vtt: string | undefined
}

const TranscribeResult = ({
  children,
  format,
  filename,
}: { children: ReactNode; format: FileFormat; filename: string }) => {
  return (
    <Actions.DefaultActionBar format={format} filename={filename}>
      <pre className='w-full h-auto max-h-72 overflow-x-auto whitespace-pre-wrap bg-gray-100 p-2 rounded break-words break-keep'>
        {children}
      </pre>
    </Actions.DefaultActionBar>
  )
}

export const TranscriptionResults = ({ raw, srt, vtt }: Props) => {
  const tabValues = [
    ...(srt
      ? [
          {
            value: 'srt',
            displayText: 'SRT',
            children: (
              <TranscribeResult format='srt' filename='subtitles'>
                {srt}
              </TranscribeResult>
            ),
          },
        ]
      : []),
    ...(vtt
      ? [
          {
            value: 'vtt',
            displayText: 'VTT',
            children: (
              <TranscribeResult format='vtt' filename='subtitles'>
                {vtt}
              </TranscribeResult>
            ),
          },
        ]
      : []),
    ...(raw
      ? [
          {
            value: 'raw',
            displayText: 'Raw',
            children: (
              <TranscribeResult format='txt' filename='transcript'>
                {raw}
              </TranscribeResult>
            ),
          },
        ]
      : []),
  ]

  return (
    <div className='m-1'>
      <h2 className='text-xl font-bold mb-2'>Results:</h2>
      <Tabs type='line'>
        {tabValues.map((tab) => (
          <TabPane tab={tab.displayText} itemKey={tab.value} key={tab.value}>
            {tab.children}
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
