import { Effect } from 'effect'
import { type CreateEmailOptions, Resend } from 'resend'

const resend = new Resend(process.env['RESEND_API_KEY'])

export const send = (params: CreateEmailOptions) =>
  Effect.gen(function* () {
    return yield* Effect.tryPromise(async () => await resend.emails.send(params))
  }).pipe(Effect.runPromise)
