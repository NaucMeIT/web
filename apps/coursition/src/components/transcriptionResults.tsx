import { Tabs } from '@nmit-coursition/design-system'
import { type ComponentProps } from 'react'

interface Props {
  raw: string | undefined
  srt: string | undefined
  vtt: string | undefined
}

export const TranscriptionResults = ({ raw, srt, vtt }: Props) => {
  // todo: use copy wrapper
  const tabValues = [
    raw ? { value: 'raw', displayText: 'Raw', children: <div>Transcripts</div> } : undefined,
    srt ? { value: 'srt', displayText: 'SRT', children: <div>SRT Subtitles</div> } : undefined,
    vtt ? { value: 'vtt', displayText: 'VTT', children: <div>VTT Subtitles</div> } : undefined,
  ].filter(Boolean) as ComponentProps<typeof Tabs>['values']

  return (
    <Tabs
      values={[
        // Merge triggers and contents
        ...tabValues,
      ]}
    />
  )
}
