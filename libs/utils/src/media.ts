import { parseMedia } from '@remotion/media-parser'
import { webFileReader } from '@remotion/media-parser/web-file'

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
  fileSize: number | null
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

interface ProcessUrlResult {
  videoSource: string
  mediaMetadata: MediaMetadata | null
}

export const processMediaUrl = async (url: string): Promise<ProcessUrlResult> => {
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

    result.mediaMetadata = extractMediaMetadataFromParsedData(metadata)
  } catch (err) {
    console.warn('Failed to get media metadata from URL:', err)
  }

  return result
}

export const extractMediaMetadata = async (file: File): Promise<MediaMetadata | null> => {
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
      reader: webFileReader,
    })

    return extractMediaMetadataFromParsedData(metadata)
  } catch (err) {
    console.warn('Failed to get video metadata:', err)
    return null
  }
}

function extractMediaMetadataFromParsedData(metadata: any): MediaMetadata {
  const dimensions = metadata.dimensions
  let dimensionsObj = null

  if (dimensions && dimensions.width && dimensions.height) {
    dimensionsObj = {
      width: dimensions.width,
      height: dimensions.height,
      aspectRatio: dimensions.width / dimensions.height,
    }
  }

  return {
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
}
