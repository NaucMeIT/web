import { Config, Effect } from 'effect'

const validateConfig = Config.all({})

export const typedEnv = Effect.runSync(validateConfig)
