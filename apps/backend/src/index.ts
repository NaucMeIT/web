import { swagger } from '@elysiajs/swagger'
import { getTranscript } from '@nmit-coursition/ai'
import { Elysia, t } from 'elysia'

new Elysia()
  .use(swagger())
  .group(
    '/v1',
    {
      headers: t.Object({
        authorization: t.String({ error: 'You must provide API key to use this service.' }),
      }),
      response: {
        200: t.Any(),
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
              async ({ body: { output, keywords, file } }) => {
                const transcript = await getTranscript(file, keywords)

                return {
                  ...(output.includes('vtt') ? { vtt: transcript.vtt } : {}),
                  ...(output.includes('srt') ? { srt: transcript.srt } : {}),
                  ...(output.includes('text') ? { text: transcript.raw } : {}),
                }
              },
              {
                body: t.Object({
                  file: t.File(),
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
                  }),
                },
              },
            )
            .post('/document', () => ''),
        ),
  )
  .listen(3000)
