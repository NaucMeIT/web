'use server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { trim } from '@nmit-coursition/utils'
import { GoogleAIFileManager } from './google'
import { FileState } from './google-types'

const systemInstruction = trim`
  You are an expert in transcription in .srt format.

  # Examples
  ## Output1
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

  ## Output2
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
`

const fileManager = new GoogleAIFileManager(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY || '')

export async function getResult(uri: string, mimeType: string) {
  const model = genAI.getGenerativeModel({
    model: 'gemini-1.5-pro-latest',
    systemInstruction,
  })
  const { response } = await model.generateContent([
    {
      fileData: {
        mimeType: mimeType || '',
        fileUri: uri,
      },
    },
    { text: 'Transcribe this video, in the format of timecode, caption in .srt format.' },
  ])
  return response.text()
}

export async function uploadFile(file: File, _: unknown) {
  const { file: uploadedFile } = await fileManager.uploadFile(file, {
    mimeType: file.type,
  })
  return { id: uploadedFile.uri, status: uploadedFile.state, waitId: uploadedFile.name }
}

export async function waitUntilJobIsDone(id: string) {
  let file = await fileManager.getFile(id)
  while (file.state === FileState.PROCESSING) {
    await new Promise((resolve) => setTimeout(resolve, 10_000))
    file = await fileManager.getFile(id)
  }

  if (file.state === FileState.FAILED) {
    throw new Error('Video processing failed.')
  }

  return file
}
