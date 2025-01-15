import { Effect } from 'effect'
import { secretsEffect } from './secrets'
import { publicConfig } from './typed'

const secrets = await Effect.runPromise(secretsEffect)
console.log(secrets)

const publics = Effect.runSync(publicConfig)
console.log(publics)
