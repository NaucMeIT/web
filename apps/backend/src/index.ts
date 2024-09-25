import { swagger } from '@elysiajs/swagger'
import { apiAuth } from '@nmit-coursition/api/auth'
import { apiDev } from '@nmit-coursition/api/dev'
import { apiV1 } from '@nmit-coursition/api/v1'
import { Elysia } from 'elysia'

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
  .use(apiAuth)
  .use(apiV1)
  .use(apiDev)
  .listen(3000)
