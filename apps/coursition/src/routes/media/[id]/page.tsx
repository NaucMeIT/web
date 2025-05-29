import { TabPane, Tabs } from '@douyinfe/semi-ui'
import { useParams } from '@modern-js/runtime/router'
import { api } from '@nmit-coursition/parse-engine/_generated/api'
import { convertSubtitlesToBlob, extractFileMetadata } from '@nmit-coursition/utils/media'
import { type MediaMetadata } from '@nmit-coursition/utils/media'
import { useQuery } from 'convex/react'
import { useEffect, useState } from 'react'
import { StatusDisplay } from '../../../components/status-display.tsx'
import { TranscriptionResults } from '../../../components/transcription-results.tsx'
import { VideoPlayer } from '../../../components/video-player.tsx'

const statusStates = [
  { key: 'upload', text: 'Uploading media' },
  { key: 'parse', text: 'Transcribing' },
]

export default function MediaId() {
  const { id: mediaId } = useParams()
  const [status, setStatus] = useState<'upload' | 'parse' | 'done'>('parse')
  const { media } = useQuery(api.media.getMediaById, { mediaId: mediaId ?? '' }) ?? {}
  const videoUrl = useQuery(api.media.getFileUrl, { storageId: media?.fileId })
  const [mediaMetadata, setMediaMetadata] = useState<MediaMetadata | null>(null)

  useEffect(() => {
    if (media?.status) {
      setStatus(media.status)
    }
  }, [media])

  useEffect(() => {
    if (videoUrl) {
      handleMetadata(videoUrl).then()
    }
  }, [videoUrl])

  const handleMetadata = async (url: string) => {
    const response = await fetch(url)
    const blob = await response.blob()
    const file = new File([blob], 'video', { type: blob.type })
    setMediaMetadata(await extractFileMetadata(file))
  }

  return (
    <div className='flex justify-center h-screen'>
      <div className='p-4 max-w-2xl w-full'>
        {status !== 'done' && <StatusDisplay states={statusStates} status={status} />}
        {media && status === 'done' && (
          <div>
            <Tabs type='line' className='mt-4'>
              {videoUrl && (
                <TabPane tab='Video' itemKey='video'>
                  <VideoPlayer
                    source={videoUrl}
                    subtitles={convertSubtitlesToBlob(media.vtt)}
                    aspectRatio={`${mediaMetadata?.dimensions?.aspectRatio}` || '16/9'}
                  />
                </TabPane>
              )}
              <TabPane tab='Text' itemKey='text'>
                <TranscriptionResults raw={media.text} srt={media.srt} vtt={media.vtt} />
              </TabPane>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  )
}
