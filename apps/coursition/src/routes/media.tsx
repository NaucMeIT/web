import { IconDelete, IconInfoCircle } from '@douyinfe/semi-icons'
import { Button, Form, Modal, TabPane, Tabs, Toast } from '@douyinfe/semi-ui'
import type { BeforeUploadProps } from '@douyinfe/semi-ui/lib/es/upload/interface'
import { convertSubtitlesToBlob } from '@nmit-coursition/utils'
import { parseMedia } from '@remotion/media-parser'
import { webFileReader } from '@remotion/media-parser/web-file'
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { z } from 'zod'
import { zfd } from 'zod-form-data'
import { StatusDisplay } from '../components/status-display'
import { TranscriptionResults } from '../components/transcription-results'
import { VideoPlayer } from '../components/video-player'
import { app } from '../lib/backend'

interface VideoDimensions {
  width: number
  height: number
  aspectRatio: number
}

interface MediaMetadata {
  dimensions: VideoDimensions | null
  durationInSeconds: number | null
  fps: number | null
  videoCodec: string | null
  audioCodec: string | null
  fileSize: number | null
  container: string | null
  isHdr: boolean | null
  sampleRate: number | null
  numberOfAudioChannels: number | null
  mimeType: string | null
}

interface AppMediaState {
  raw: string
  srt: string
  vtt: string
  videoSource: string
  uploadedFile: File | null
  mediaMetadata: MediaMetadata | null
}

const isYouTubeUrl = (url: string): boolean => {
  return /youtube\.com|youtu\.be/i.test(url)
}

const isVimeoUrl = (url: string): boolean => {
  return /vimeo\.com/i.test(url)
}

interface ProcessUrlResult {
  videoSource: string
  mediaMetadata: MediaMetadata | null
}

const formatFileSize = (bytes: number | null): string => {
  if (bytes === null) return 'Unknown'

  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
  else return (bytes / 1073741824).toFixed(1) + ' GB'
}

const formatDuration = (seconds: number | null): string => {
  if (seconds === null) return 'Unknown'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

const processMediaUrl = async (url: string): Promise<ProcessUrlResult> => {
  const result: ProcessUrlResult = {
    videoSource: url,
    mediaMetadata: null,
  }

  if (isYouTubeUrl(url) || isVimeoUrl(url)) {
    console.log('YouTube or Vimeo URL detected, skipping metadata extraction')
    return result
  }

  try {
    const metadata = await parseMedia({
      src: url,
      fields: {
        dimensions: true,
        durationInSeconds: true,
        fps: true,
        videoCodec: true,
        audioCodec: true,
        size: true,
        container: true,
        isHdr: true,
        sampleRate: true,
        numberOfAudioChannels: true,
        mimeType: true,
      },
      acknowledgeRemotionLicense: true,
    })

    const dimensions = metadata.dimensions
    let dimensionsObj = null

    if (dimensions && dimensions.width && dimensions.height) {
      dimensionsObj = {
        width: dimensions.width,
        height: dimensions.height,
        aspectRatio: dimensions.width / dimensions.height,
      }
    }

    result.mediaMetadata = {
      dimensions: dimensionsObj,
      durationInSeconds: metadata.durationInSeconds || null,
      fps: metadata.fps || null,
      videoCodec: metadata.videoCodec || null,
      audioCodec: metadata.audioCodec || null,
      fileSize: metadata.size || null,
      container: metadata.container || null,
      isHdr: metadata.isHdr || null,
      sampleRate: metadata.sampleRate || null,
      numberOfAudioChannels: metadata.numberOfAudioChannels || null,
      mimeType: metadata.mimeType || null,
    }
  } catch (err) {
    console.warn('Failed to get media metadata from URL:', err)
  }

  console.log(result)
  return result
}

const initialState: AppMediaState = {
  raw: '',
  srt: '',
  vtt: '',
  videoSource: '',
  uploadedFile: null,
  mediaMetadata: null,
}

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

const statusStates = [
  { key: 'upload', text: 'Uploading media' },
  { key: 'parse', text: 'Transcribing' },
]

export const Route = createFileRoute('/media')({
  component: Media,
})

function Media() {
  const [status, setStatus] = useState<'idle' | 'upload' | 'parse' | 'done'>('idle')
  const [state, setState] = useState<AppMediaState>(initialState)
  const [isProcessingUrl, setIsProcessingUrl] = useState(false)
  const [currentUrl, setCurrentUrl] = useState('')
  const [modal, contextHolder] = Modal.useModal()

  const showFileDetails = () => {
    if (!state.mediaMetadata) return

    const metadata = state.mediaMetadata

    modal.info({
      title: 'Media File Details',
      content: (
        <div className='grid grid-cols-2 gap-x-6 gap-y-3 mt-4'>
          {metadata.dimensions && (
            <div>
              <div className='font-medium text-gray-700'>Dimensions</div>
              <div>
                {metadata.dimensions.width}x{metadata.dimensions.height}
              </div>
            </div>
          )}

          {metadata.durationInSeconds !== null && metadata.durationInSeconds !== undefined && (
            <div>
              <div className='font-medium text-gray-700'>Duration</div>
              <div>{formatDuration(metadata.durationInSeconds ?? null)}</div>
            </div>
          )}

          {metadata.fps !== null && (
            <div>
              <div className='font-medium text-gray-700'>FPS</div>
              <div>{metadata.fps.toFixed(2)}</div>
            </div>
          )}

          {metadata.videoCodec && (
            <div>
              <div className='font-medium text-gray-700'>Video Codec</div>
              <div>{metadata.videoCodec}</div>
            </div>
          )}

          {metadata.audioCodec && (
            <div>
              <div className='font-medium text-gray-700'>Audio Codec</div>
              <div>{metadata.audioCodec}</div>
            </div>
          )}

          {metadata.fileSize !== null && metadata.fileSize !== undefined && (
            <div>
              <div className='font-medium text-gray-700'>File Size</div>
              <div>{formatFileSize(metadata.fileSize ?? null)}</div>
            </div>
          )}

          {metadata.container && (
            <div>
              <div className='font-medium text-gray-700'>Container</div>
              <div>{metadata.container}</div>
            </div>
          )}

          {metadata.isHdr !== null && (
            <div>
              <div className='font-medium text-gray-700'>HDR</div>
              <div>{metadata.isHdr ? 'Yes' : 'No'}</div>
            </div>
          )}

          {metadata.sampleRate !== null && (
            <div>
              <div className='font-medium text-gray-700'>Audio Sample Rate</div>
              <div>{metadata.sampleRate} Hz</div>
            </div>
          )}

          {metadata.numberOfAudioChannels !== null && (
            <div>
              <div className='font-medium text-gray-700'>Audio Channels</div>
              <div>{metadata.numberOfAudioChannels}</div>
            </div>
          )}

          {metadata.mimeType && (
            <div>
              <div className='font-medium text-gray-700'>MIME Type</div>
              <div>{metadata.mimeType}</div>
            </div>
          )}
        </div>
      ),
      width: 600,
      maskClosable: true,
    })
  }

  const renderFileOperations = (fileItem: any) => {
    return (
      <div style={{ display: 'flex', columnGap: 8, padding: '0 8px' }}>
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

      const metadata = await parseMedia({
        src: file,
        fields: {
          dimensions: true,
          durationInSeconds: true,
          fps: true,
          videoCodec: true,
          audioCodec: true,
          size: true,
          container: true,
          isHdr: true,
          sampleRate: true,
          numberOfAudioChannels: true,
          mimeType: true,
        },
        acknowledgeRemotionLicense: true,
        reader: webFileReader,
      })

      console.log('File metadata:', metadata)

      let dimensionsObj = null
      const dimensions = metadata.dimensions

      if (dimensions && dimensions.width && dimensions.height) {
        dimensionsObj = {
          width: dimensions.width,
          height: dimensions.height,
          aspectRatio: dimensions.width / dimensions.height,
        }
      }

      setState((prev) => ({
        ...prev,
        uploadedFile: file,
        videoSource: URL.createObjectURL(file),
        mediaMetadata:
          dimensionsObj || metadata.durationInSeconds || metadata.size
            ? {
                dimensions: dimensionsObj,
                durationInSeconds: metadata.durationInSeconds,
                fps: metadata.fps,
                videoCodec: metadata.videoCodec,
                audioCodec: metadata.audioCodec,
                fileSize: metadata.size,
                container: metadata.container,
                isHdr: metadata.isHdr,
                sampleRate: metadata.sampleRate,
                numberOfAudioChannels: metadata.numberOfAudioChannels,
                mimeType: metadata.mimeType,
              }
            : null,
      }))

      // Return successful validation result
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

      // Still allow the file, just without metadata
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
      const { videoSource, mediaMetadata } = await processMediaUrl(url)

      setState((prev) => ({
        ...prev,
        videoSource,
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

      if (parsedData.type === 'url' && !state.mediaMetadata?.dimensions) {
        setStatus('upload')
        const { videoSource, mediaMetadata } = await processMediaUrl(parsedData.url)

        setState((prev) => ({
          ...prev,
          videoSource,
          mediaMetadata,
        }))
      }

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
      console.log(data)
      console.log(error)

      if (error) throw new Error(error.value.description)
      const { text, srt, vtt } = data
      setStatus('done')
      setState((prev) => ({ ...prev, raw: text ?? '', srt: srt ?? '', vtt: vtt ?? '' }))
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
                      id='url'
                      name='url'
                      placeholder='Enter media URL'
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
                {/*
                  // TODO: Change to switch, so that it's impossible to pick incorrect language.
                */}
                <Form.Input
                  field='text'
                  id='language'
                  name='language'
                  placeholder='en-GB'
                  label='Language'
                  helpText='What is main language of the video. Accepted is language keycode, e.g. en-GB, cs.'
                />
                <Form.TextArea
                  field='text'
                  label='Difficult words'
                  placeholder='ChatGPT, Claude, Zig'
                  id='keywords'
                  helpText='Unusual words or phrases that may be difficult to transcribe. Separate with commas. Avoid putting common words.'
                />
              </div>

              <div className='flex flex-col gap-2'>
                <Button block htmlType='submit'>
                  Transcribe
                </Button>
              </div>
            </Form>

            {/* Modal context holder for Semi UI modals */}
            {contextHolder}
          </>
        )}
        {status !== 'idle' && status !== 'done' && <StatusDisplay states={statusStates} status={status} />}
        {status === 'done' && (
          <>
            <Tabs type='line' className='mt-4'>
              <TabPane tab='Video' itemKey='video'>
                <VideoPlayer
                  source={state.videoSource}
                  subtitles={convertSubtitlesToBlob(state.vtt)}
                  aspectRatio={
                    state.mediaMetadata?.dimensions
                      ? `${state.mediaMetadata.dimensions.width}/${state.mediaMetadata.dimensions.height}`
                      : '16/9'
                  }
                />
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
