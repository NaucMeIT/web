import { mediaRouter } from './router/media'
import { createTRPCRouter } from './trpc'

export const appRouter = createTRPCRouter({
  media: mediaRouter,
})

export type AppRouter = typeof appRouter
