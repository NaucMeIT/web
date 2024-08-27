import { swagger } from '@elysiajs/swagger'
import { getTranscript } from '@nmit-coursition/ai'
import { Elysia, t } from 'elysia'

new Elysia()
  .use(swagger())
  .group('/v1', (app) =>
    app.group('/parse', (v1Api) =>
      v1Api.post(
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
            output: t.Array(t.Union([t.Literal('vtt'), t.Literal('srt'), t.Literal('text')]), { default: ['text'] }),
            keywords: t.Array(t.String(), { default: [] }),
          }),
          transform({ body }) {
            body.output &&= Array.isArray(body.output) ? body.output : [body.output]
            body.keywords &&= Array.isArray(body.keywords) ? body.keywords : [body.keywords]
          },
          response: t.Object({
            vtt: t.Optional(t.String()),
            srt: t.Optional(t.String()),
            text: t.Optional(t.String()),
          }),
        },
      ),
    ),
  )
  .listen(3000)
