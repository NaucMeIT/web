import { Tabs, TabsContent, TabsList, TabsTrigger } from '@nmit-coursition/ui/primitives'
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useState } from 'react'

interface Props {
  raw: string
  srt: string
  vtt: string
}

export const TranscriptionResults = ({ raw, srt, vtt }: Props) => {
  return (
    <Tabs defaultValue='raw' className='w-full'>
      <TabsList className='w-full'>
        <TabsTrigger value='raw'>raw</TabsTrigger>
        <TabsTrigger value='srt'>srt</TabsTrigger>
        <TabsTrigger value='vtt'>vtt</TabsTrigger>
      </TabsList>
      <TabsContent value='raw'>
        <TextCopier text={raw} title='Transcript' />
      </TabsContent>
      <TabsContent value='srt'>
        <TextCopier text={srt} title='SRT subtitles' />
      </TabsContent>
      <TabsContent value='vtt'>
        <TextCopier text={vtt} title='VTT subtitles' />
      </TabsContent>
    </Tabs>
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
