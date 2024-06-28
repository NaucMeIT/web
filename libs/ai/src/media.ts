'use server'
import { createClient, srt } from '@deepgram/sdk'

const deepgram = createClient(process.env.DEEPGRAM_API_KEY || '')

// biome-ignore lint/suspicious/noExplicitAny: Ain't nobody got time for that
export async function getTranscript(file: any): Promise<string> {
  const { result, error } = await deepgram.listen.prerecorded.transcribeFile(file, {
    smart_format: true,
    model: 'nova-2',
    language: 'en-GB',
    utterances: true,
  })

  return srt(result)
}
