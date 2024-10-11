import { Tabs } from '@nmit-coursition/ui/design-system'

interface Props {
  raw: string | undefined
  srt: string | undefined
  vtt: string | undefined
}

export const TranscriptionResults = ({ raw, srt, vtt }: Props) => {
  // TODO: use copy wrapper
  const tabValues = [
    ...(raw ? [{ value: 'raw', displayText: 'Raw', children: <pre>{raw}</pre> }] : []),
    ...(srt ? [{ value: 'srt', displayText: 'SRT', children: <pre>{srt}</pre> }] : []),
    ...(vtt ? [{ value: 'vtt', displayText: 'VTT', children: <pre>{vtt}</pre> }] : []),
  ]

  return <Tabs values={tabValues} />
}
