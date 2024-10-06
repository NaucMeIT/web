import { Tabs } from '@nmit-coursition/design-system'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  raw: string
  srt: string
  vtt: string
}

export const TranscriptionResults = ({ raw, srt, vtt }: Props) => {
  return (
    <Tabs
      values={[
        // Merge triggers and contents
        { value: 'raw', displayText: 'raw', children: <TextCopier text={raw} title='Transcript' /> },
        { value: 'srt', displayText: 'srt', children: <TextCopier text={srt} title='SRT subtitles' /> },
        { value: 'vtt', displayText: 'vtt', children: <TextCopier text={vtt} title='VTT subtitles' /> },
      ]}
    />
  )
}

const TextCopier = ({ text, title }: { text: string; title: string }) => {
  const [isCopied, setIsCopied] = useState(false)

  async function copyToClipboard(text: string) {
    try {
      setIsCopied(true)
      await navigator.clipboard.writeText(text)
      setTimeout(() => setIsCopied(false), 2000)
    } catch {
      setIsCopied(false)
    }
  }

  const iconClassName = 'cursor-pointer absolute right-2'

  return (
    <div className='relative flex flex-col gap-2 w-full bg-muted rounded-md p-2'>
      {isCopied ? (
        <CheckIcon size={17} className={iconClassName} />
      ) : (
        <CopyIcon size={17} onClick={() => copyToClipboard(text)} className={iconClassName} />
      )}

      <h3 className='text-lg font-semibold mb-1'>{title}</h3>
      <pre className='w-full h-auto max-h-60 overflow-auto text-sm'>{text}</pre>
    </div>
  )
}
