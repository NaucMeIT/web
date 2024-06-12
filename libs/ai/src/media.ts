'use server'

import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { Storage } from '@google-cloud/storage'
import { trim } from '@nmit-coursition/utils'

// TODO: Patch the AI SDK, because it allows only inline content (base64) and not file URLs
// https://github.com/vercel/ai/blob/main/packages/google/src/convert-to-google-generative-ai-messages.ts
export async function getTranscript(fileUrl: string) {
  const { text } = await generateText({
    model: google('models/gemini-1.5-flash-latest'),
    messages: [
      {
        role: 'system',
        content: trim`
          You are an expert in making video/audio transcription in .srt format.

          EXAMPLE OUTPUT1:
          1
          00:00:00,498 --> 00:00:02,827
          - Here's what I love most
          about food and diet.

          2
          00:00:02,827 --> 00:00:06,383
          We all eat several times a day,
          and we're totally in charge

          3
          00:00:06,383 --> 00:00:09,427
          of what goes on our plate
          and what stays off.

          EXAMPLE OUTPUT2:
          1
          00:00:03,400 --> 00:00:06,177
          In this lesson, we're going to
          be talking about finance. And

          2
          00:00:06,177 --> 00:00:10,009
          one of the most important aspects
          of finance is interest.

          3
          00:00:10,009 --> 00:00:13,655
          When I go to a bank or some
          other lending institution

          4
          00:00:13,655 --> 00:00:17,720
          to borrow money, the bank is happy
          to give me that money. But then I'm

          5
          00:00:17,900 --> 00:00:21,480
          going to be paying the bank for the
          privilege of using their money.
        `,
      },
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: trim`
              Can you transcribe this audio, in the format of timecode, caption?
            `,
          },
          {
            type: 'image',
            image: new URL(fileUrl),
          },
        ],
      },
    ],
  })

  return text
}

const bucketName = 'coursition-media-2024'
const storage = new Storage({ keyFilename: 'coursition-storage.json' })

export const uploadToGcs = async (file: File) => {
  if (!file) throw new Error('No file provided')
  if (file.size < 1) throw new Error('File is empty')

  const buffer = await file.arrayBuffer()
  const storage = new Storage()
  await storage.bucket(bucketName).file(file.name).save(Buffer.from(buffer))

  return true
}

export const uploadFile = async (form: FormData) => {
  try {
    const file = form.get('file') as File
    await uploadToGcs(file)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getSignedUrl = async (fileName: string) => {
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl({
      action: 'write',
      version: 'v4',
      expires: Date.now() + 15 * 60 * 1000,
      contentType: 'application/octet-stream',
    })

  return url
}

export async function deleteFile(fileName: string, deleteOptions = {}) {
  try {
    await storage.bucket(bucketName).file(fileName).delete(deleteOptions)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export const setCors = async () => {
  await storage.bucket(bucketName).setCorsConfiguration([
    {
      maxAgeSeconds: 3600,
      method: ['GET', 'PUT'],
      origin: ['*'],
      responseHeader: ['Content-Type'],
    },
  ])
}

// TODO: Delete following content
export const toBase64 = (file: Blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
  })

export async function uploadMediaGoogleApis(file: File) {
  const body = new FormData()
  body.append('file', file)

  const uploadResponse = await fetch(`https://generativelanguage.googleapis.com/upload/v1beta/files`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      contentType: 'multipart/form-data',
      Authorization: `Bearer ${process.env['LLAMA_CLOUD_API_KEY']}`,
    },
    body,
  })

  return uploadResponse
}
