import { apiOrder } from '@nmit-coursition/order/api-order'
import { Elysia } from 'elysia'
import { apiAuth } from './api-auth'
import { apiDev } from './api-dev'
import { apiV1 } from './api-v1'

/**
 * Combined API instance that includes all API modules
 */
export const typedBe = new Elysia().use(apiAuth).use(apiOrder).use(apiV1).use(apiDev)

/**
 * Type definition for the complete API application
 */
export type TypedApp = typeof typedBe

// Re-export modules for individual use if needed
export { apiAuth } from './api-auth'
export { apiDev } from './api-dev'
export { apiV1 } from './api-v1'

// Export utility functions and types
export * from './utils/api'
export * from './utils/api-utils'
export * from './utils/download-media'
export * from './utils/errorList'
export * from './utils/model'
export * from './utils/typescript'
