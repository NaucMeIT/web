import { treaty } from '@elysiajs/eden'
import type { TypedApp } from '@nmit-coursition/api/full/api-full'
import { publicConfig } from '@nmit-coursition/env/typed'
import { Effect } from 'effect'

const typedPublic = Effect.runSync(publicConfig)
const backendUrl = typedPublic.BACKEND_URL.href || `http://localhost:${typedPublic.BACKEND_PORT}`
export const app = treaty<TypedApp>(backendUrl)
