import { formatDuration, formatFileSize } from '@nmit-coursition/utils'
import type { MediaMetadata } from '@nmit-coursition/utils'

interface MediaFileDetailsProps {
  metadata: MediaMetadata
}

export function MediaFileDetails({ metadata }: MediaFileDetailsProps) {
  return (
    <div className='grid grid-cols-2 gap-x-6 gap-y-3 pb-3'>
      {metadata.dimensions && (
        <div>
          <div className='font-medium text-gray-700'>Dimensions</div>
          <div>
            {metadata.dimensions.width}x{metadata.dimensions.height}
          </div>
        </div>
      )}

      {metadata.durationInSeconds != null && (
        <div>
          <div className='font-medium text-gray-700'>Duration</div>
          <div>{formatDuration(metadata.durationInSeconds)}</div>
        </div>
      )}

      {metadata.fps != null && (
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

      {metadata.fileSize != null && (
        <div>
          <div className='font-medium text-gray-700'>File Size</div>
          <div>{formatFileSize(metadata.fileSize)}</div>
        </div>
      )}

      {metadata.container && (
        <div>
          <div className='font-medium text-gray-700'>Container</div>
          <div>{metadata.container}</div>
        </div>
      )}

      {metadata.isHdr && (
        <div>
          <div className='font-medium text-gray-700'>HDR</div>
          <div>{metadata.isHdr ? 'Yes' : 'No'}</div>
        </div>
      )}

      {metadata.sampleRate != null && (
        <div>
          <div className='font-medium text-gray-700'>Audio Sample Rate</div>
          <div>{metadata.sampleRate} Hz</div>
        </div>
      )}

      {metadata.numberOfAudioChannels != null && (
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
  )
}
