import { apiAuth } from '@nmit-coursition/api/auth/api-auth'
import { apiDev } from '@nmit-coursition/api/dev/api-dev'
import { apiV1 } from '@nmit-coursition/api/v1/lib/api-v1'
import { apiOrder } from '@nmit-coursition/order/api-order'
import { Elysia } from 'elysia'

export const typedBe = new Elysia().use(apiAuth).use(apiOrder).use(apiV1).use(apiDev)

export type TypedApp = typeof typedBe
