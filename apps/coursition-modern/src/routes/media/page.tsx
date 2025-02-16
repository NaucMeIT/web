import { Button, Form, TabPane, Tabs, Toast } from '@douyinfe/semi-ui'
import { convertSubtitlesToBlob } from '@nmit-coursition/utils'
import { useState } from 'react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { StatusDisplay } from '../../components/status-display'
import { TranscriptionResults } from '../../components/transcription-results'
import { VideoPlayer } from '../../components/video-player'
import { app } from '../../lib/backend'

const fileSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('file'),
    file: zfd.file(),
    keywords: z.string().optional(),
    language: z.string().optional(),
  }),
  z.object({
    type: z.literal('url'),
    url: z.string().url(),
    keywords: z.string().optional(),
    language: z.string().optional(),
  }),
])

const initialState = {
  raw: '',
  srt: '',
  vtt: '',
  videoSource: '',
}

const statusStates = [
  { key: 'upload', text: 'Uploading media' },
  { key: 'parse', text: 'Transcribing' },
]

export default function Media() {
  const [status, setStatus] = useState<'idle' | 'upload' | 'parse' | 'done'>('idle')
  const [state, setState] = useState<any>(initialState)

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      setStatus('upload')

      const type = 'file' in values ? 'file' : 'url'
      const parsedData = fileSchema.parse({ type, ...values, file: (values as any).file[0].fileInstance })
      const videoSource = parsedData.type === 'file' ? URL.createObjectURL(parsedData.file) : parsedData.url

      setStatus('parse')
      const keywordsArray = parsedData.keywords ? parsedData.keywords.split(',').map((word) => `${word}:5`) : []
      const output: ('text' | 'vtt' | 'srt')[] = ['text', 'srt', 'vtt']

      const options = {
        headers: {
          authorization: 'PRODPGrFxpGEtrOZfuWhnoJohUYBXuOE',
        },
      }
      const { data, error } =
        parsedData.type == 'file'
          ? await app.v1.parse.media.post(
              {
                file: parsedData.file,
                keywords: keywordsArray,
                language: (parsedData.language || 'en-GB') as any,
                output,
              },
              options,
            )
          : await app.v1.parse['public-media'].post(
              {
                url: parsedData.url,
                keywords: keywordsArray,
                language: (parsedData.language || 'en-GB') as any,
                output,
              },
              options,
            )

      if (error) throw new Error(error.value.description)
      const { text, srt, vtt } = data
      setStatus('done')
      setState({ raw: text, srt, vtt, videoSource })
    } catch (error) {
      Toast.error(`Something went wrong. Reason: ${error instanceof Error ? error.message : 'Unknown.'}`)
      setStatus('idle')
      setState(initialState)
    }
  }

  return (
    <div className='flex justify-center h-screen'>
      <div className='p-4 max-w-2xl w-full'>
        {status === 'idle' && (
          <>
            <h1 className='text-2xl font-bold mb-4'>Upload media</h1>
            <Form className='space-y-4' onSubmit={handleSubmit}>
              <Tabs type='line' keepDOM={false}>
                <TabPane tab='File' itemKey='file'>
                  {/*
                    // TODO: Extract audio with Remotion as part of customRequest.
                  */}
                  <Form.Upload
                    customRequest={() => {}}
                    action=''
                    draggable
                    dragMainText="Drag 'n' drop some files here, or click to select files"
                    dragSubText='Only video and audio files are allowed'
                    field='file'
                    limit={1}
                    accept='video/*, audio/*'
                  />
                </TabPane>
                <TabPane tab='URL' itemKey='url'>
                  <Form.Input field='url' placeholder='Enter media URL' required />
                </TabPane>
              </Tabs>
              <div className='flex gap-3 flex-col w-full'>
                {/*
                  // TODO: Change to switch, so that it's impossible to pick incorrect language.
                */}
                <Form.Input
                  field='language'
                  placeholder='en-GB'
                  label='Language'
                  helpText='What is main language of the video. Accepted is language keycode, e.g. en-GB, cs.'
                />
                <Form.TextArea
                  field='keywords'
                  label='Difficult words'
                  placeholder='ChatGPT, Claude, Zig'
                  helpText='Unusual words or phrases that may be difficult to transcribe. Separate with commas. Avoid putting common words.'
                />
              </div>
              <div className='flex gap-4'>
                <Button block htmlType='submit'>
                  Transcribe
                </Button>
              </div>
            </Form>
          </>
        )}
        {status !== 'idle' && status !== 'done' && <StatusDisplay states={statusStates} status={status} />}
        {status === 'done' && (
          <>
            <Tabs type='line' className='mt-4'>
              <TabPane tab='Video' itemKey='video'>
                <VideoPlayer source={state.videoSource} subtitles={convertSubtitlesToBlob(state.vtt)} />
              </TabPane>
              <TabPane tab='Text' itemKey='text'>
                <TranscriptionResults raw={state.raw} srt={state.srt} vtt={state.vtt} />
              </TabPane>
            </Tabs>
          </>
        )}
      </div>
    </div>
  )
}
