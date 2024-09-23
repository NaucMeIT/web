import FirecrawlApp from '@mendable/firecrawl-js'
import { generateQuiz, getResult, getTranscript, uploadFile, waitUntilJobIsDone } from '@nmit-coursition/ai'
import { apiCommonGuard, formatApiErrorResponse, reportUsage } from '@nmit-coursition/api/utils'
import {
  allowedDeepgramLanguagesAsType,
  allowedLlamaParseLanguagesAsType,
  languages,
  languagesAsType,
} from '@nmit-coursition/utils'
import { Elysia, t } from 'elysia'

export const apiV1 = new Elysia({ prefix: '/v1' })
  .use(apiCommonGuard)
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
            language: t.Optional(allowedDeepgramLanguagesAsType),
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
            if (response && !('duration' in response)) return
            const duration = response?.duration || 0
            duration >= 0 && reportUsage(headers['authorization'] || '', duration, 'video')
          },
        },
      )
      .post(
        '/document',
        async ({ body: { file, language, description }, error: errorFn, request }) => {
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
          } catch (error) {
            return errorFn(
              500,
              formatApiErrorResponse(request, `Something went wrong while processing your document. Details: ${error}`),
            )
          }
        },
        {
          body: t.Object({
            file: t.File(),
            language: t.Optional(allowedLlamaParseLanguagesAsType),
            description: t.Optional(t.String()),
          }),
          response: {
            200: t.Object({
              md: t.String(),
              credits: t.Number(),
            }),
          },
          afterResponse({ response, headers }) {
            if (response && !('credits' in response)) return
            const credits = response?.credits || 0
            credits >= 0 && reportUsage(headers['authorization'] || '', credits, 'document')
          },
        },
      )
      .post(
        '/web',
        async ({ body: { url, onlyMainContent }, error, request }) => {
          const fcApp = new FirecrawlApp({ apiKey: process.env['FIRECRAWL_API_KEY'] })

          const scrapeResponse = await fcApp.scrapeUrl(url, {
            formats: ['markdown'],
            onlyMainContent,
          })

          if (!scrapeResponse.success) {
            return error(500, formatApiErrorResponse(request, scrapeResponse.error))
          }
          if (!scrapeResponse.markdown) {
            return error(500, formatApiErrorResponse(request, 'Content of the page is empty.'))
          }

          return {
            md: scrapeResponse.markdown,
            metadata: scrapeResponse.metadata,
            credits: 1,
          }
        },
        {
          body: t.Object({
            url: t.String({ format: 'uri' }),
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
            if (response && !('credits' in response)) return
            const credits = response?.credits || 0
            credits >= 0 && reportUsage(headers['authorization'] || '', credits, 'web')
          },
        },
      ),
  )
  .group('/ai', (aiApp) =>
    aiApp.post(
      '/quiz',
      async ({
        body: { content, outputLang, amountQuestions, amountAnswers, allowMultiple },
        error: errorFn,
        request,
      }) => {
        try {
          const quiz = await generateQuiz(content, {
            outputLang: languages[outputLang || 'en'],
            amountQuestions,
            amountAnswers,
            allowMultiple,
          })
          return quiz
        } catch (error) {
          return errorFn(500, formatApiErrorResponse(request, `Error generating quiz: ${error}`))
        }
      },
      {
        body: t.Object({
          content: t.String(),
          outputLang: t.Optional(languagesAsType),
          amountQuestions: t.Optional(t.Number()),
          amountAnswers: t.Optional(t.Number()),
          allowMultiple: t.Optional(t.Boolean()),
        }),
        response: {
          200: t.Object({
            chapterName: t.String(),
            tasks: t.Array(
              t.Object({
                question: t.String(),
                answers: t.Array(
                  t.Object({
                    text: t.String(),
                    isCorrect: t.Boolean(),
                  }),
                ),
              }),
            ),
          }),
        },
      },
    ),
  )
