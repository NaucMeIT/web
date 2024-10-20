import { InfisicalSDK } from '@infisical/sdk'
import { parseError } from '@nmit-coursition/api/utils'
import { Config, ConfigProvider, Data, Effect, Layer } from 'effect'
import { url, redactedString, redactedUrl } from './utils'

class EmptyError extends Data.TaggedError('EmptyError')<{}> {}
class FetchError extends Data.TaggedError('FetchError')<{ details: string }> {}
class InfisicalError extends Data.TaggedError('InfisicalError')<{}> {}

class InfisicalClient extends Effect.Service<InfisicalClient>()('env/InfisicalClient', {
  effect: Effect.gen(function* () {
    const accessToken = yield* Config.string('ACCESS_TOKEN')
    const projectId = yield* Config.string('PROJECT_ID')
    const siteUrl = (yield* url('SITE_URL')).href

    if (!accessToken || !projectId) {
      yield* Effect.fail(new EmptyError())
    }

    const client = yield* Effect.tryPromise({
      try: async () => {
        const client = new InfisicalSDK({ siteUrl })
        await client.auth().accessToken(accessToken)
        return client
      },
      catch: () => new InfisicalError(),
    })

    const fetchSecrets = () =>
      Effect.tryPromise({
        try: () =>
          client.secrets().listSecrets({
            environment: 'dev',
            projectId,
          }),
        catch: (e) => new FetchError({ details: parseError(e).message || 'Unknown error during fetching secrets' }),
      })

    return { client, fetchSecrets } as const
  }),
}) {}

class SecretsConfig extends Effect.Service<SecretsConfig>()('env/SecretsConfig', {
  effect: Effect.gen(function* () {
    const { fetchSecrets } = yield* InfisicalClient
    const allSecrets = yield* fetchSecrets()
    const secretsObj = allSecrets.secrets
      .map((secret) => ({ [secret.secretKey]: secret.secretValue }))
      .reduce((acc, curr) => Object.assign(acc, curr), {})

    const jsonConfigProvider = ConfigProvider.fromJson(secretsObj)
    const jsonConfigLayer = Layer.setConfigProvider(jsonConfigProvider)

    const config = yield* Config.all({
      DEEPGRAM_API_KEY: redactedString('DEEPGRAM_API_KEY'),
      LLAMA_CLOUD_API_KEY: redactedString('LLAMA_CLOUD_API_KEY'),
      OPENAI_API_KEY: redactedString('OPENAI_API_KEY'),
      FIRECRAWL_API_KEY: redactedString('FIRECRAWL_API_KEY'),
      LEMON_SQUEEZY_API_KEY: redactedString('LEMON_SQUEEZY_API_KEY'),
      LEMON_SQUEEZY_WEBHOOK_SECRET: redactedString('LEMON_SQUEEZY_WEBHOOK_SECRET'),
      DATABASE_URL: redactedUrl('DATABASE_URL'),
      DIRECT_URL: redactedUrl('DIRECT_URL'),
      WORKOS_CLIENT_ID: redactedString('WORKOS_CLIENT_ID'),
      WORKOS_API_KEY: redactedString('WORKOS_API_KEY'),
      WORKOS_COOKIE_PASSWORD: redactedString('WORKOS_COOKIE_PASSWORD'),
      RESEND_API_KEY: redactedString('RESEND_API_KEY'),
      NEXTAUTH_SECRET: redactedString('NEXTAUTH_SECRET'),
      GOOGLE_SECRET: redactedString('GOOGLE_SECRET'),
      GOOGLE_ID: redactedString('GOOGLE_ID'),
    }).pipe(Effect.provide(jsonConfigLayer))

    return config
  }),
  dependencies: [InfisicalClient.Default],
}) {}

const program = Effect.gen(function* (_) {
  const config = yield* SecretsConfig
  return config
})

const secrets = program.pipe(
  Effect.provide(SecretsConfig.Default),
  Effect.catchTag('FetchError', (error) => Effect.die(`Fetching secrets failed. Details: ${error.details}`)),
  Effect.catchTag('EmptyError', () => Effect.die('Empty PROJECT_ID or ACCESS_TOKEN.')),
  Effect.catchTag('InfisicalError', () => Effect.die('Initialization of Infisical failed.')),
)
type Secrets = Effect.Effect.Success<typeof secrets>

// * We use top-level await to wait for this module during build time.
export let secretsEnv: Secrets
await Effect.runPromise(secrets).then((secrets) => {
  secretsEnv = secrets
})
