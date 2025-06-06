import { parseMedia } from '@remotion/media-parser'

interface VideoDimensions {
  width: number
  height: number
  aspectRatio: number
}

export interface MediaMetadata {
  dimensions: VideoDimensions | null
  durationInSeconds: number | null
  fps: number | null
  videoCodec: string | null
  audioCodec: string | null
  size: number | null
  container: string | null
  isHdr: boolean | null
  sampleRate: number | null
  numberOfAudioChannels: number | null
  mimeType: string | null
}

export const convertSubtitlesToBlob = (input = '') => {
  const blobSrt = new Blob([input], {
    type: 'text/vtt',
  })

  return window.URL.createObjectURL(blobSrt)
}

const isYouTubeUrl = (url: string): boolean => {
  return /youtube\.com|youtu\.be/i.test(url)
}

const isVimeoUrl = (url: string): boolean => {
  return /vimeo\.com/i.test(url)
}

export const formatFileSize = (bytes: number | null): string => {
  if (bytes === null) return 'Unknown'

  if (bytes < 1024) return bytes + ' bytes'
  else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB'
  else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + ' MB'
  else return (bytes / 1073741824).toFixed(1) + ' GB'
}

export const formatDuration = (seconds: number | null): string => {
  if (seconds === null) return 'Unknown'

  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = Math.floor(seconds % 60)
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
}

export const extractUrlMetadata = async (url: string): Promise<MediaMetadata | null> => {
  if (isYouTubeUrl(url) || isVimeoUrl(url)) {
    console.log('YouTube or Vimeo URL detected, skipping metadata extraction')
    return null
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

    const fullMetadata: MediaMetadata =
      metadata.dimensions && metadata.dimensions.width && metadata.dimensions.height
        ? {
            ...metadata,
            dimensions: { ...metadata.dimensions, aspectRatio: metadata.dimensions.width / metadata.dimensions.height },
          }
        : {
            ...metadata,
            dimensions: null,
          }

    return fullMetadata
  } catch (err) {
    console.warn('Failed to get media metadata from URL:', err)
    return null
  }
}

export const extractFileMetadata = async (file: File): Promise<MediaMetadata | null> => {
  try {
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
    })
    const fullMetadata: MediaMetadata =
      metadata.dimensions && metadata.dimensions.width && metadata.dimensions.height
        ? {
            ...metadata,
            dimensions: { ...metadata.dimensions, aspectRatio: metadata.dimensions.width / metadata.dimensions.height },
          }
        : {
            ...metadata,
            dimensions: null,
          }

    return fullMetadata
  } catch (err) {
    console.warn('Failed to get video metadata:', err)
    return null
  }
}
