import { unlink } from 'node:fs/promises'
import { downloadPublicMedia } from '@nmit-coursition/api'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '../../../parse-engine/convex/_generated/api'
import { type Id } from '../../../parse-engine/convex/_generated/dataModel'

if (!process.env['PUBLIC_CONVEX_URL']) {
  throw new Error('PUBLIC_CONVEX_URL is not defined')
}
const convexClient = new ConvexHttpClient(process.env['PUBLIC_CONVEX_URL'])

interface persistMediaProps {
  output: ('vtt' | 'srt' | 'text')[]
  identityId: string
  file?: File
  publicMediaUrl?: string
  keywords?: string[] | undefined
  language?: string | undefined
}

export const persistNewMedia = async (props: persistMediaProps) => {
  const { file, publicMediaUrl, ...restProps } = props
  const mediaId = await convexClient.mutation(api.media.newMedia, {
    status: 'upload',
  })

  if (file) {
    const fileId = await uploadMediaFile(props.file as File)
    const workflowId = await convexClient.action(api.admin.startMediaWorkflow, {
      ...restProps,
      mediaId,
      fileId,
    })
    console.log('workflowId [file]', workflowId)
  } else if (publicMediaUrl) {
    const { path } = await downloadPublicMedia(publicMediaUrl)
    const file = Bun.file(path)
    const fileId = await uploadMediaFile(new File([file], file.name ?? (path.split('/').pop() as string), {}))
    await unlink(path)
    const workflowId = await convexClient.action(api.admin.startPublicMediaWorkflow, {
      ...restProps,
      fileId,
      mediaId,
      publicMediaUrl,
    })
    console.log('workflowId [url]', workflowId)
  } else {
    console.error('Either file or publicMediaUrl is required')
    throw new Error('Either file or publicMediaUrl is required')
  }

  return mediaId
}

export const uploadMediaFile = async (file: File): Promise<Id<'_storage'>> => {
  const uploadUrl = await convexClient.mutation(api.media.generateUploadUrl, {})
  const formData = new FormData()
  formData.append('file', file, file.name)

  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      'Content-Type': file.type,
      'Content-Disposition': `attachment; filename="${file.name}"`,
    },
    body: file,
  })

  if (!uploadResponse.ok) {
    console.error('File upload failed', uploadResponse.statusText)
    throw new Error('File upload failed')
  }

  const { storageId } = await uploadResponse.json()
  return storageId as Id<'_storage'>
}

export default convexClient
