import { createClient, srt, webvtt } from '@deepgram/sdk'
import { secretsEffect } from '@nmit-coursition/env'
import { Context, Data, Effect, Layer, Redacted } from 'effect'

interface TranscriptSuccess {
  srt: string
  vtt: string
  raw?: string
  metadata: { duration: number }
}
interface TranscriptError {
  error: string
}
type TranscriptResult = TranscriptSuccess | TranscriptError

export class Params extends Context.Tag('Params')<Params, { language: string; keywords: string[] }>() {
  static readonly Test = {
    language: '',
    keywords: [],
  }
}

export class MediaFile extends Context.Tag('MediaFile')<MediaFile, Buffer>() {
  static readonly Test = Buffer.from('')
}

class InternalError extends Data.TaggedError('InternalError')<{}> {}
class TranscribeError extends Data.TaggedError('TranscribeError')<{}> {}
class EmptyError extends Data.TaggedError('EmptyError')<{}> {}

const deepgram = Effect.gen(function* () {
  const secrets = yield* secretsEffect
  const deepgramClient = createClient(Redacted.value(secrets.DEEPGRAM_API_KEY))
  return {
    getTranscript: Effect.gen(function* () {
      const { language, keywords } = yield* Params
      const file = yield* MediaFile
      const { result } = yield* Effect.tryPromise({
        try: () =>
          deepgramClient.listen.prerecorded.transcribeFile(file, {
            model: 'nova-2',
            smart_format: true,
            utterances: true,
            numerals: true,
            punctuate: true,
            paragraphs: true,
            ...(language ? { language } : { detect_language: true }),
            keywords,
          }),
        catch: () => new InternalError(),
      })

      if (!result) {
        return yield* new TranscribeError()
      }

      if (result.metadata.duration === 0) {
        return yield* new EmptyError()
      }

      try {
        // * Remove unnecessary metadata
        const vtt = webvtt(result).replace(/WEBVTT\s*\n(?:[\s\S]*?)(?=^(?:\d{2}:)?\d{2}:\d{2})/m, 'WEBVTT\n\n')

        return {
          srt: srt(result),
          vtt,
          raw: result?.results?.channels?.[0]?.alternatives?.[0]?.transcript,
          metadata: result.metadata,
        }
      } catch {
        return yield* new EmptyError()
      }
    }),
  } as const
})

export class TranscribeApi extends Context.Tag('TranscribeApi')<
  TranscribeApi,
  Effect.Effect.Success<typeof deepgram>
>() {
  static readonly Deepgram = Layer.effect(this, deepgram)
}

// TODO: Remove once we get rid of the old getTranscript function
const program = Effect.gen(function* () {
  const transcribeApi = yield* TranscribeApi
  return yield* transcribeApi.getTranscript
})

/**
 * @deprecated Use TranscribeApi instead, this is just compability layer for now.
 */
export function getTranscript(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- deepgram sdk is not typed correctly
  file: any,
  keywords: string[] = [],
  language: string = 'en',
): Promise<TranscriptResult> {
  return Effect.runPromise(
    program.pipe(
      Effect.provideService(Params, {
        language,
        keywords,
      }),
      Effect.provideService(MediaFile, file),
      Effect.provide(TranscribeApi.Deepgram),
      Effect.catchTag('InternalError', () => Effect.succeed({ error: 'Internal error.' })),
      Effect.catchTag('TranscribeError', () => Effect.succeed({ error: 'Failed creating transcription.' })),
      Effect.catchTag('EmptyError', () => Effect.succeed({ error: 'Input file contains no audio to transcribe.' })),
    ),
  )
}
