import { parseError } from '@nmit-coursition/api/utils/lib/error'
import { Data, Effect } from 'effect'
import { privateConfig } from './typed'

export class EmptyError extends Data.TaggedError('EmptyError')<{}> {}
export class FetchError extends Data.TaggedError('FetchError')<{ details: string }> {}
export class InfisicalError extends Data.TaggedError('InfisicalError')<{ details: string }> {}

export class InfisicalClient extends Effect.Service<InfisicalClient>()('env/InfisicalClient', {
  effect: Effect.gen(function* () {
    const {
      ACCESS_TOKEN,
      PROJECT_ID: projectId,
      SITE_URL: { href: siteUrl },
    } = yield* privateConfig

    if (!ACCESS_TOKEN || !projectId) {
      yield* Effect.fail(new EmptyError())
    }

    const client = yield* Effect.tryPromise({
      try: async () => {
        const normalizedSiteUrl = siteUrl.replace(/\/+$/, '')

        return {
          secrets: () => ({
            listSecrets: async ({
              environment,
              projectId,
            }: {
              environment: string
              projectId: string
            }) => {
              const url = `${normalizedSiteUrl}/api/v3/secrets/raw?workspaceId=${projectId}&environment=${environment}`
              const response = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${ACCESS_TOKEN}`,
                },
              })
              if (!response.ok) {
                throw new Error(`Error fetching secrets: ${response.statusText}`)
              }
              return response.json()
            },
          }),
        }
      },
      catch: (e) =>
        new InfisicalError({
          details: parseError(e).message || 'Unknown error during fetching secrets',
        }),
    })

    const fetchSecrets = () =>
      Effect.tryPromise({
        try: () =>
          client.secrets().listSecrets({
            environment: 'dev',
            projectId,
          }),
        catch: (e) =>
          new FetchError({
            details: parseError(e).message || 'Unknown error during fetching secrets',
          }),
      })

    const getSecrets = () =>
      Effect.gen(function* () {
        const { secrets } = yield* fetchSecrets()
        return secrets
          .map((secret: any) => ({ [secret.secretKey]: secret.secretValue }))
          .reduce((acc: any, curr: any) => Object.assign(acc, curr), {}) as { [key: string]: string }
      })

    return { getSecrets } as const
  }),
}) {}
