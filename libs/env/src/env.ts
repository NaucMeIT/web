import { Config, Effect } from 'effect'
import { url } from './utils'

const validateConfig = Config.all({
  LEMON_SQUEEZY_STORE_ID: Config.string('LEMON_SQUEEZY_STORE_ID'),
  NMIT_LIFETIME_PRODUCT_VARIANT_ID: Config.string('NMIT_LIFETIME_PRODUCT_VARIANT_ID'),
  NEXTAUTH_URL: url('NEXTAUTH_URL'),
})

export const typedEnv = Effect.runSync(validateConfig)
