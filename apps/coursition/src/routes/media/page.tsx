import { IconDelete, IconInfoCircle } from '@douyinfe/semi-icons'
import { Button, Form, Modal, Select, TabPane, Tabs, Toast } from '@douyinfe/semi-ui'
import type { BeforeUploadProps } from '@douyinfe/semi-ui/lib/es/upload/interface'
import { allowedDeepgramLanguages, deepgramLanguageNames } from '@nmit-coursition/utils/languages'
import {
  type MediaMetadata,
  // allowedDeepgramLanguages,
  convertSubtitlesToBlob,
  // deepgramLanguageNames,
  extractFileMetadata,
  extractUrlMetadata,
} from '@nmit-coursition/utils/media'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { MediaFileDetails } from '../../components/media-file-details'
import { StatusDisplay } from '../../components/status-display'
import { TranscriptionResults } from '../../components/transcription-results'
import { type MediaSrc, VideoPlayer } from '../../components/video-player'
import { app } from '../../lib/backend'

interface AppMediaState {
  raw: string | undefined
  srt: string | undefined
  vtt: string | undefined
  videoSource: MediaSrc | undefined
  uploadedFile: File | null
  mediaMetadata: MediaMetadata | null
}

const initialState: AppMediaState = {
  raw: undefined,
  srt: undefined,
  vtt: undefined,
  videoSource: undefined,
  uploadedFile: null,
  mediaMetadata: null,
}

const fileSchema = z.discriminatedUnion('type', [
  z.object({
    type: z.literal('file'),
    file: zfd.file(),
    keywords: z.string().optional(),
    language: z.enum(allowedDeepgramLanguages),
  }),
  z.object({
    type: z.literal('url'),
    url: z.string().url(),
    keywords: z.string().optional(),
    language: z.enum(allowedDeepgramLanguages),
  }),
])

const statusStates = [
  { key: 'upload', text: 'Uploading media' },
  { key: 'parse', text: 'Transcribing' },
]

export default function Media() {
  const [status, setStatus] = useState<'idle' | 'upload' | 'parse' | 'done'>('idle')
  const [state, setState] = useState<AppMediaState>(initialState)
  const [isProcessingUrl, setIsProcessingUrl] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [modal, contextHolder] = Modal.useModal()
  const navigate = useNavigate()

  const showFileDetails = () => {
    if (!state.mediaMetadata) return

    modal.info({
      title: 'Media File Details',
      content: <MediaFileDetails metadata={state.mediaMetadata} />,
      maskClosable: true,
      footer: null,
    })
  }

  const renderFileOperations = (fileItem: any) => {
    return (
      <div className='flex column-gap-2 p-2'>
        {state.mediaMetadata && (
          <Button
            icon={<IconInfoCircle />}
            theme='borderless'
            type='tertiary'
            size='small'
            onClick={showFileDetails}
            aria-label='File details'
          />
        )}
        <Button
          icon={<IconDelete />}
          theme='borderless'
          type='tertiary'
          size='small'
          onClick={() => {
            if (fileItem && typeof fileItem.onRemove === 'function') {
              fileItem.onRemove()
            }
            setState((prev) => ({
              ...prev,
              uploadedFile: null,
              videoSource: '',
              mediaMetadata: null,
            }))
          }}
          aria-label='Remove file'
        />
      </div>
    )
  }

  const handleBeforeUpload = async ({ file: metaFile }: BeforeUploadProps) => {
    try {
      if (!metaFile.fileInstance) return { shouldUpload: false, status: 'error' }
      const file = metaFile.fileInstance

      const mediaMetadata = await extractFileMetadata(file)

      setState((prev) => ({
        ...prev,
        uploadedFile: file,
        videoSource: URL.createObjectURL(file),
        mediaMetadata,
      }))

      return {
        shouldUpload: true,
        status: 'success',
      }
    } catch (err) {
      console.warn('Failed to get video metadata:', err)

      if (!metaFile.fileInstance) return { shouldUpload: false, status: 'error' }
      const file = metaFile.fileInstance
      setState((prev) => ({
        ...prev,
        uploadedFile: file,
        videoSource: URL.createObjectURL(file),
      }))

      return {
        shouldUpload: true,
        status: 'success',
      }
    }
  }

  const handleUrlBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
    const url = e.target.value.trim()

    setCurrentUrl(url)

    if (!url || !/^https?:\/\//i.test(url)) {
      if (!url) {
        setState((prev) => ({
          ...prev,
          videoSource: '',
          mediaMetadata: null,
        }))
      }
      return
    }

    try {
      setIsProcessingUrl(true)
      const mediaMetadata = await extractUrlMetadata(url)

      setState((prev) => ({
        ...prev,
        mediaMetadata,
      }))
    } catch (error) {
      console.warn('Error processing URL on blur:', error)
    } finally {
      setIsProcessingUrl(false)
    }
  }

  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      setStatus('upload')

      const type = 'file' in values ? 'file' : 'url'
      const dataToValidate = type === 'file' ? { type, ...values, file: state.uploadedFile } : { type, ...values }
      const parsedData = fileSchema.parse(dataToValidate)
      const videoSource =
        parsedData.type === 'file'
          ? ({ src: URL.createObjectURL(parsedData.file), type: 'video/mp4' } as const)
          : parsedData.url

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
      const { text = '', srt = '', vtt = '', id } = data

      if (id) {
        navigate(`/media/${id}`)
      }
      setStatus('done')
      setState((prev) => ({ ...prev, raw: text, srt, vtt, videoSource }))
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
            <Form className='space-y-4' onSubmit={handleSubmit} initValues={{ language: 'en' }}>
              <Tabs type='line' keepDOM={false}>
                <TabPane tab='File' itemKey='file'>
                  <Form.Upload
                    customRequest={() => {}}
                    beforeUpload={handleBeforeUpload}
                    action=''
                    draggable
                    dragMainText="Drag 'n' drop some files here, or click to select files"
                    dragSubText='Only video and audio files are allowed'
                    field='file'
                    limit={1}
                    accept='video/*, audio/*'
                    renderFileOperation={renderFileOperations}
                  />
                </TabPane>
                <TabPane tab='URL' itemKey='url'>
                  <div className='relative'>
                    <Form.Input
                      field='url'
                      type='url'
                      placeholder='Enter media URL'
                      disabled={isProcessingUrl}
                      required
                      label='URL'
                      helpText={
                        isProcessingUrl
                          ? 'Analyzing media...'
                          : 'Enter media URL to analyze, it can be YouTube, Vimeo or any direct link to a media file.'
                      }
                      onBlur={handleUrlBlur}
                    />
                    <Button
                      icon={<IconInfoCircle />}
                      theme='borderless'
                      type='tertiary'
                      size='small'
                      disabled={!state.mediaMetadata || !currentUrl}
                      onClick={showFileDetails}
                      aria-label='URL details'
                      className='absolute right-2 top-1/2 transform -translate-y-1/2 z-10'
                      style={{ opacity: state.mediaMetadata && currentUrl ? 1 : 0.5 }}
                      tabIndex={state.mediaMetadata && currentUrl ? 1 : -1}
                    />
                  </div>
                </TabPane>
              </Tabs>
              <div className='flex gap-3 flex-col w-full'>
                <Form.Select
                  field='language'
                  label='Language'
                  filter
                  helpText='Main language of the video'
                  style={{ width: 180 }}
                >
                  {Object.entries(deepgramLanguageNames).map(([code, name]) => (
                    <Select.Option key={code} value={code}>
                      {name}
                    </Select.Option>
                  ))}
                </Form.Select>
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
            {contextHolder}
          </>
        )}
        {status !== 'idle' && status !== 'done' && <StatusDisplay states={statusStates} status={status} />}
        {status === 'done' && (
          <>
            <Tabs type='line' className='mt-4'>
              {state.videoSource && (
                <TabPane tab='Video' itemKey='video'>
                  <VideoPlayer
                    source={state.videoSource}
                    subtitles={convertSubtitlesToBlob(state.vtt)}
                    aspectRatio={`${state.mediaMetadata?.dimensions?.aspectRatio}` || '16/9'}
                  />
                </TabPane>
              )}
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
