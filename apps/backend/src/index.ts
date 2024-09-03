import { swagger } from '@elysiajs/swagger'
import FirecrawlApp from '@mendable/firecrawl-js'
import { getResult, getTranscript, uploadFile, waitUntilJobIsDone } from '@nmit-coursition/ai'
import { Elysia, t } from 'elysia'

function reportUsage(apiKey: string, duration: number, type: 'video' | 'document' | 'web') {
  console.log(`API Key ${apiKey} used ${duration} on ${type}.`)
}

function validateApiKey(apiKey: string) {
  if (!apiKey) return false
}

const fcApp = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY })

new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'Coursition API',
          version: '1.0.0',
          description:
            'Mix of API endpoints used to power Coursition and related apps. Also available as API for 3rd parties. Please contact me at syreanis@gmail.com for more information.',
        },
        tags: [
          {
            name: 'v1',
            description:
              "Stable endpoints in version 1 of API. Endpoints defined here won't be deleted, but might be marked as deprecated for following versions.",
          },
        ],
      },
    }),
  )
  .group(
    '/v1',
    {
      headers: t.Object({
        authorization: t.String({ error: 'You must provide API key to use this service.' }),
      }),
      response: {
        200: t.Unknown(),
        401: t.String(),
        429: t.String(),
        500: t.String(),
      },
      detail: {
        tags: ['v1'],
      },
    },
    (v1App) =>
      v1App
        .onBeforeHandle(({ headers, error }) => {
          validateApiKey(headers.authorization) && error(401, 'Provided API key is invalid.')
        })
        .group('/parse', (parseApp) =>
          parseApp
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
                  duration >= 0 && reportUsage(headers.authorization, duration, 'video')
                },
              },
            )
            .post(
              '/document',
              async ({ body: { file, language, description }, error }) => {
                try {
                  const { id, status } = await uploadFile(file, {
                    inputLang: language,
                    contentDescription: description,
                  })
                  await waitUntilJobIsDone(id, status)
                  const { markdown, credits } = await getResult(id)
                  return {
                    md: markdown,
                    credits,
                  }
                } catch (e) {
                  return error(500, `Something went wrong while processing your document. Details: ${e}`)
                }
              },
              {
                body: t.Object({
                  file: t.File(),
                  language: t.Optional(t.String()),
                  description: t.Optional(t.String()),
                }),
                response: {
                  200: t.Object({
                    md: t.String(),
                    credits: t.Number(),
                  }),
                },
                afterResponse({ response, headers }) {
                  // ! Elysia infers incorrect response (including status code as a key)
                  // biome-ignore lint/suspicious/noExplicitAny: Above comment
                  const credits = (response as any)?.credits
                  credits >= 0 && reportUsage(headers.authorization, credits, 'document')
                },
              },
            )
            .post(
              '/web',
              async ({ body: { url, onlyMainContent }, error }) => {
                const scrapeResponse = await fcApp.scrapeUrl(url, {
                  formats: ['markdown'],
                  onlyMainContent,
                })

                if (!scrapeResponse.success) {
                  return error(500, scrapeResponse.error)
                }
                if (!scrapeResponse.markdown) {
                  return error(500, 'Content of the page is empty.')
                }

                return {
                  md: scrapeResponse.markdown,
                  metadata: scrapeResponse.metadata,
                  credits: 1,
                }
              },
              {
                body: t.Object({
                  url: t.String(),
                  onlyMainContent: t.Optional(t.Boolean()),
                }),
                response: {
                  200: t.Object({
                    md: t.String(),
                    metadata: t.Optional(t.Record(t.String(), t.Unknown())),
                    credits: t.Number(),
                  }),
                },
                afterResponse({ response, headers }) {
                  // ! Elysia infers incorrect response (including status code as a key)
                  // biome-ignore lint/suspicious/noExplicitAny: Above comment
                  const credits = (response as any)?.credits
                  credits >= 0 && reportUsage(headers.authorization, credits, 'web')
                },
              },
            ),
        ),
  )
  .listen(3000)
