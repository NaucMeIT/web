import { Config, ConfigProvider, Effect, Layer } from 'effect'

// ! To make sure we don't leak any sensitive information, we have to add this to publicVars and validate in publicConfig
const publicVars = ConfigProvider.fromJson({
  PUBLIC_CONVEX_URL: process.env['PUBLIC_CONVEX_URL'],
  PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY: process.env['PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY'],
  PUBLIC_BACKEND_PORT: process.env['PUBLIC_BACKEND_PORT'],
  PUBLIC_BACKEND_URL: process.env['PUBLIC_BACKEND_URL'],
  PUBLIC_FRONTEND_URL: process.env['PUBLIC_FRONTEND_URL'],
})
const publicLayer = Layer.setConfigProvider(publicVars)

export const publicConfig = Effect.provide(
  Config.all({
    CONVEX_URL: Config.url('PUBLIC_CONVEX_URL'),
    LIVEBLOCKS_PUBLIC_API_KEY: Config.string('PUBLIC_LIVEBLOCKS_PUBLIC_API_KEY'),
    BACKEND_PORT: Config.integer('PUBLIC_BACKEND_PORT').pipe(Config.withDefault(3001)),
    BACKEND_URL: Config.url('PUBLIC_BACKEND_URL'),
    FRONTEND_URL: Config.url('PUBLIC_FRONTEND_URL'),
  }),
  publicLayer,
)

export const privateConfig = Config.all({
  ACCESS_TOKEN: Config.string('ACCESS_TOKEN'),
  PROJECT_ID: Config.string('PROJECT_ID'),
  SITE_URL: Config.url('SITE_URL'),
})
