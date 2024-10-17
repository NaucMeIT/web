import { secretsEnv } from '@nmit-coursition/env'
import { Redacted } from 'effect'
import { type CreateEmailOptions, Resend } from 'resend'

const resend = new Resend(Redacted.value(secretsEnv.RESEND_API_KEY))

export const send = async (params: CreateEmailOptions) => await resend.emails.send(params)
