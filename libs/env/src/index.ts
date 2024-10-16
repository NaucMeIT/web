import { Redacted } from 'effect'
import { secretsEnv } from './secrets'

export * from './secrets'
export * from './env'

console.log(Redacted.value(secretsEnv.NEXTAUTH_SECRET))
