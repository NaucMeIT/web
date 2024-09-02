import { swagger } from '@elysiajs/swagger'
import { getTranscript } from '@nmit-coursition/ai'
import { Elysia, t } from 'elysia'

function reportUsage(key: string, duration: number) {
  console.log(`API Key ${key} used ${duration}.`)
}

new Elysia()
  .use(swagger())
  .group(
    '/v1',
    {
      headers: t.Object({
        authorization: t.String({ error: 'You must provide API key to use this service.' }),
      }),
      response: {
        200: t.Unknown(),
        401: t.String(),
      },
    },
    (app) =>
      app
        .onBeforeHandle(({ headers: { authorization }, error }) => {
          if (!authorization) return error(401, 'Provided API key is invalid.')
        })
        .group('/parse', (v1Api) =>
          v1Api
            .post(
              '/media',
              async ({ body: { output, keywords, file, language } }) => {
                const transcript = await getTranscript(file, keywords, language)

                return {
                  ...(output.includes('vtt') ? { vtt: transcript.vtt } : {}),
                  ...(output.includes('srt') ? { srt: transcript.srt } : {}),
                  ...(output.includes('text') ? { text: transcript.raw } : {}),
                  duration: transcript.metadata?.duration,
                }
              },
              {
                body: t.Object({
                  file: t.File(),
                  language: t.Optional(t.String()),
                  output: t.Array(t.Union([t.Literal('vtt'), t.Literal('srt'), t.Literal('text')]), {
                    default: ['text'],
                  }),
                  keywords: t.Array(t.String(), { default: [] }),
                }),
                transform({ body }) {
                  body.output &&= Array.isArray(body.output) ? body.output : [body.output]
                  body.keywords &&= Array.isArray(body.keywords) ? body.keywords : [body.keywords]
                },
                response: {
                  200: t.Object({
                    vtt: t.Optional(t.String()),
                    srt: t.Optional(t.String()),
                    text: t.Optional(t.String()),
                    duration: t.Optional(t.Number()),
                  }),
                },
                afterResponse({ response, headers }) {
                  // ! Elysia infers incorrect response (including status code as a key)
                  // biome-ignore lint/suspicious/noExplicitAny: Above comment
                  const duration = (response as any)?.duration
                  duration >= 0 && reportUsage(headers.authorization, duration)
                },
              },
            )
            .post('/document', () => ''),
        ),
  )
  .listen(3000)
