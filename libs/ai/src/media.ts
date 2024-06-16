'use server'

import { generateText } from 'ai'
import { google } from '@ai-sdk/google'
import { Storage } from '@google-cloud/storage'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { trim } from '@nmit-coursition/utils'
import { GoogleAIFileManager } from './google'

export async function getTranscript(file: File) {
  // Upload file
  const fileManager = new GoogleAIFileManager(process.env['GOOGLE_GENERATIVE_AI_API_KEY'] || '')
  const uploadResult = await fileManager.uploadFile(file, {
    mimeType: 'video/mp4',
  })
  const files = await fileManager.listFiles()
  console.log(files)

  // Generate content
  const genAI = new GoogleGenerativeAI(process.env['GOOGLE_GENERATIVE_AI_API_KEY'] || '')
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-flash-latest',
  })
  const result = await model.generateContent([
    {
      fileData: {
        mimeType: uploadResult.file.mimeType,
        fileUri: uploadResult.file.uri,
      },
    },
    { text: 'Transcribe this video, in the format of timecode, caption in .srt format.' },
  ])
  return { result, files }
}

export async function getTranscript2(fileUrl: string, mimeType?: string) {
  const { text } = await generateText({
    model: google('models/gemini-1.5-pro-latest'),
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
            type: 'file',
            mimeType,
            file: fileUrl,
          },
        ],
      },
    ],
  })

  return text
}

const bucketName = 'coursition-media-2024'
const storage = new Storage({ keyFilename: 'coursition-storage.json' })

export const getSignedUrl = async (fileName: string) => {
  const [url] = await storage
    .bucket(bucketName)
    .file(fileName)
    .getSignedUrl({
      action: 'write',
      version: 'v4',
      expires: Date.now() + 15 * 60 * 1000,
      contentType: 'video/mp4',
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
      Authorization: `Bearer ${process.env['GOOGLE_GENERATIVE_AI_API_KEY']}`,
    },
    body,
  })

  return uploadResponse
}
