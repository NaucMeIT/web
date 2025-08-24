import { publicConfig } from '@nmit-coursition/env/typed'
import { api } from '@nmit-coursition/parse-engine/_generated/api'
import { ConvexClient } from 'convex/browser'
import { Effect } from 'effect'
import { Elysia, t } from 'elysia'
import { formatApiErrorResponse } from './utils/api'
import { apiCommonGuard, computeUsage, reportSpend } from './utils/api-utils'

const { CONVEX_URL } = await Effect.runPromise(publicConfig)
const convexClient = new ConvexClient(CONVEX_URL.href)

export const apiDev = new Elysia({ prefix: '/dev', tags: ['dev'] })
  .use(apiCommonGuard)
  .get('/ping', () => ({ status: 'ZEROPS' }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .get('/fail', () => {
    throw new Error(
      `This is error message from always failing endpoint. Current server time: ${new Date().toISOString()}`,
    )
  })
  .get('/report-usage', async () => await computeUsage({ organisationId: 1 }), {
    afterResponse: ({ request }) => reportSpend({ request }),
  })
  .group('/convex', (convexApp) =>
    convexApp.get(
      '/tasks',
      async ({ error: errorFn, request }) => {
        try {
          const mediaItems = await convexClient.query(api.media.getMedia, { count: 10 })
          return {
            tasks: mediaItems.items.map((item) => ({
              text: item.text || '',
              isCompleted: true,
              _id: item._id,
            })),
          }
        } catch (error) {
          return errorFn(500, formatApiErrorResponse(request, `Failed to fetch tasks: ${error}`))
        }
      },
      {
        response: {
          200: t.Object({
            tasks: t.Array(
              t.Object({
                text: t.String(),
                isCompleted: t.Boolean(),
                _id: t.Any(),
              }),
            ),
          }),
        },
      },
    ),
  )
