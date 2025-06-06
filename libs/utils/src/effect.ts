import { DevTools } from '@effect/experimental'
import { NodeSdk } from '@effect/opentelemetry'
import { BunHttpServer } from '@effect/platform-bun'
import { BatchSpanProcessor, ConsoleSpanExporter } from '@opentelemetry/sdk-trace-base'
import { SentrySpanProcessor } from '@sentry/opentelemetry'
import { Layer, ManagedRuntime } from 'effect'

const BunSdkLive = NodeSdk.layer(() => ({
  resource: { serviceName: 'bun-server' },
  spanProcessor:
    process.env['NODE_ENV'] === 'development'
      ? new BatchSpanProcessor(new ConsoleSpanExporter())
      : new SentrySpanProcessor(),
}))

const MainLayer = Layer.mergeAll(
  DevTools.layer(),
  BunSdkLive,
  // Elysia start on BACKEND_PORT, Effect needs to run on another until we migrate
  BunHttpServer.layer({ port: (Number(process.env['BACKEND_PORT']) ?? 3001) + 1 }),
)

export const ServerRuntime = ManagedRuntime.make(MainLayer)
