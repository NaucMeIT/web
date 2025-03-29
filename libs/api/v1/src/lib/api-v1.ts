import { unlink } from 'node:fs/promises'
import FirecrawlApp from '@mendable/firecrawl-js'
import { getResult, uploadFile, waitUntilJobIsDone } from '@nmit-coursition/ai/document'
import { generateQuiz } from '@nmit-coursition/ai/generate'
import { getTranscript } from '@nmit-coursition/ai/media'
import { formatApiErrorResponse } from '@nmit-coursition/api/utils/api'
import { downloadPublicMedia } from '@nmit-coursition/api/utils/download-media'
import { apiCommonGuard } from '@nmit-coursition/api/utils/lib/api-utils'
import { reportUsage } from '@nmit-coursition/api/utils/lib/api-utils'
import { AUTH_BRJ_COOKIES_NAME } from '@nmit-coursition/auth/constants'
import { secretsEffect } from '@nmit-coursition/env/secrets'
import {
  allowedDeepgramLanguagesAsType,
  allowedLlamaParseLanguagesAsType,
  languages,
  languagesAsType,
} from '@nmit-coursition/utils/languages'
import { Effect } from 'effect'
import { Redacted } from 'effect'
import { Elysia, t } from 'elysia'

const secretsEnv = await Effect.runPromise(secretsEffect)
export const apiV1 = new Elysia({ prefix: '/v1', tags: ['v1'] })
  .use(apiCommonGuard)
  .group('/parse', (parseApp) =>
    parseApp
      .post(
        '/media',
        async ({ body: { output, keywords, file, language }, error: errorFn, request }) => {
          const transcript = await getTranscript(file, keywords, language)

          if ('error' in transcript) {
            return errorFn(500, formatApiErrorResponse(request, `Failed to process media: ${transcript.error}`))
          }

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
          afterResponse({ response, cookie }) {
            if (!response || !('duration' in response) || !response.duration) return
            const { duration } = response
            const brjSessionData = cookie[AUTH_BRJ_COOKIES_NAME]?.toString() || ''
            duration >= 0 && reportUsage(brjSessionData, duration, 'video')
          },
        },
      )
      .post(
        '/public-media',
        async ({ body: { url, output, keywords, language }, error: errorFn, request }) => {
          try {
            const { path } = await downloadPublicMedia(url)
            const audioFile = Buffer.from(await Bun.file(path).arrayBuffer())
            const transcript = await getTranscript(audioFile, keywords, language)
            await unlink(path)

            if ('error' in transcript) {
              return errorFn(
                500,
                formatApiErrorResponse(request, `Failed to process public media: ${transcript.error}`),
              )
            }

            return {
              ...(output.includes('vtt') ? { vtt: transcript.vtt } : {}),
              ...(output.includes('srt') ? { srt: transcript.srt } : {}),
              ...(output.includes('text') ? { text: transcript.raw } : {}),
              duration: transcript.metadata?.duration,
            }
          } catch (error) {
            return errorFn(500, formatApiErrorResponse(request, `Failed to process public media: ${error}`))
          }
        },
        {
          body: t.Object({
            url: t.String({ format: 'uri' }),
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
          afterResponse({ response, cookie }) {
            if (!response || !('duration' in response) || !response.duration) return
            const { duration } = response
            const brjSessionData = cookie[AUTH_BRJ_COOKIES_NAME]?.toString() || ''
            duration >= 0 && reportUsage(brjSessionData, duration, 'video')
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
          afterResponse({ response, cookie }) {
            if (!response || !('credits' in response) || !response.credits) return
            const { credits } = response
            const brjSessionData = cookie[AUTH_BRJ_COOKIES_NAME]?.toString() || ''
            credits >= 0 && reportUsage(brjSessionData, credits, 'document')
          },
        },
      )
      .post(
        '/web',
        async ({ body: { url, onlyMainContent }, error, request }) => {
          const fcApp = new FirecrawlApp({ apiKey: Redacted.value(secretsEnv.FIRECRAWL_API_KEY) })

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
          afterResponse({ response, cookie }) {
            if (!response || !('credits' in response) || !response.credits) return
            const { credits } = response
            const brjSessionData = cookie[AUTH_BRJ_COOKIES_NAME]?.toString() || ''
            credits >= 0 && reportUsage(brjSessionData, credits, 'web')
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
