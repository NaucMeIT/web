import { ServerRuntime } from '@nmit-coursition/utils/effect'
import { secretsEffect } from './secrets'
import { publicConfig } from './typed'

const secrets = await ServerRuntime.runPromise(secretsEffect)
console.log(secrets)

const publics = ServerRuntime.runSync(publicConfig)
console.log(publics)

await ServerRuntime.dispose()
