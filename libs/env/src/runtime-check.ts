import { Effect } from 'effect'
import { secretsEffect } from './secrets'

const secrets = await Effect.runPromise(secretsEffect)
console.log(secrets)
