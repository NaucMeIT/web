import { createClient, srt, webvtt } from '@deepgram/sdk'
import { Context, Data, Effect, Layer, ManagedRuntime } from 'effect'

interface TranscriptOutput {
  srt: string
  vtt: string
  raw?: string
  metadata: { duration: number }
}

export class Config extends Context.Tag('Config')<Config, { language: string; keywords: string[] }>() {
  static readonly Test = {
    language: '',
    keywords: [],
  }
}

export class MediaFile extends Context.Tag('MediaFile')<MediaFile, Buffer>() {
  static readonly Test = Buffer.from('')
}

const deepgramClient = createClient(process.env['DEEPGRAM_API_KEY'] || '')

class FetchError extends Data.TaggedError('FetchError')<{}> {}
class TranscribeError extends Data.TaggedError('TranscribeError')<{}> {}

const deepgram = Effect.succeed({
  getTranscript: Effect.gen(function* () {
    const { language, keywords } = yield* Config
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
      catch: () => new FetchError(),
    })

    if (!result) {
      return yield* new TranscribeError()
    }

    // * Remove unnecessary metadata
    const vtt = webvtt(result).replace(/WEBVTT\s*\n(?:[\s\S]*?)(?=^(?:\d{2}:)?\d{2}:\d{2})/m, 'WEBVTT\n\n')

    return {
      srt: srt(result),
      vtt,
      raw: result?.results?.channels?.[0]?.alternatives?.[0]?.transcript,
      metadata: result.metadata,
    }
  }),
})

export class TranscribeApi extends Context.Tag('TranscribeApi')<
  TranscribeApi,
  Effect.Effect.Success<typeof deepgram>
>() {
  static readonly Deepgram = Layer.effect(this, deepgram)
}

// TODO: Remove once we get rid of the old getTranscript function
const program = Effect.gen(function* (_) {
  const transcribeApi = yield* TranscribeApi
  return yield* transcribeApi.getTranscript
})

const MainLayer = Layer.mergeAll(TranscribeApi.Deepgram)

const TranscribeRuntime = ManagedRuntime.make(MainLayer)

/**
 * @deprecated Use TranscribeApi instead, this is just compability layer for now.
 */
export function getTranscript(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- deepgram sdk is not typed correctly
  file: any,
  keywords: string[] = [],
  language: string = 'en',
): Promise<TranscriptOutput> {
  return TranscribeRuntime.runPromise(
    program.pipe(
      Effect.provideService(Config, {
        language,
        keywords,
      }),
      Effect.provideService(MediaFile, file),
    ),
  )
}
