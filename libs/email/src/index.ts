import { type CreateEmailOptions, Resend } from 'resend'

const resend = new Resend(process.env['RESEND_API_KEY'])

export const send = async (params: CreateEmailOptions) => await resend.emails.send(params)

export * as Components from './components'
