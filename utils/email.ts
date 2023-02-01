import sendgrid from "@sendgrid/mail"
import { GetServerSideProps } from "next"
import { handle, json } from "next-runtime"
import { log } from "next-axiom"
import FormData from "form-data"

type PageProps = {}
type UrlQuery = {}
export type ContactFormData = {
    readonly name: string
    readonly email: string
    readonly phone?: string
    readonly message: string
    readonly recaptcha: string
}
export type CompanyFormData = {
    readonly name: string
    readonly email: string
    readonly phone: string
    readonly company: string
    readonly employee: string
    readonly message: string | undefined
    readonly recaptcha: string
}
export type ErrorFormData = {
    readonly email: string
    readonly name: string
    readonly message: string
    readonly chapter: string
    readonly recaptcha: string
}

export function formatErrorForm(data: ErrorFormData) {
    return `
Kapitola: ${data.chapter}

${data.message}

------------------------------------------------------

Jméno: ${data.name}
Email: ${data.email}
    `
}

export function formatContactForm(data: ContactFormData) {
    return `
${data.message}

------------------------------------------------------

Jméno: ${data.name}
Email: ${data.email}
${data.phone && `Telefon: ${data.phone}`}
`
}

export function formatCompanyForm(data: CompanyFormData) {
    return `
Jméno: ${data.name}
Firma: ${data.company}
Telefon: ${data.phone}
Typ zaměstnance: ${data.employee}
${data.message && `Zpráva: ${data.message}`}

------------------------------------------------------

Email: ${data.email}
`
}

async function sendEmail(replyTo: string, text: string, subject: string, recaptcha: string, to: string) {
    if (!recaptcha) {
        log.error("No recaptcha token")
        // eslint-disable-next-line functional/no-throw-statements
        throw new Error("No recaptcha")
    }

    const formData = new FormData()
    formData.append("secret", process.env.RECAPTCHA_BACKEND || "")
    formData.append("response", recaptcha)

    const verify = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
        method: "POST",
        body: formData as unknown as BodyInit,
    }).then((res) => res.json())
    if (!verify.success) {
        // eslint-disable-next-line functional/no-throw-statements
        throw new Error("Recaptcha failed")
    }

    await sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "")
    await sendgrid.send({
        to,
        from: "info@naucme.it",
        replyTo,
        subject,
        text,
    })
}

export function handleEmail<
    T extends { readonly email: string; readonly message: string | undefined; readonly recaptcha: string },
>(formatFunction: (data: T) => string, subject: string, to = "info@naucme.it"): GetServerSideProps {
    return handle<PageProps, UrlQuery, T>({
        async get() {
            return json({})
        },
        async post({ req: { body } }) {
            try {
                const message = formatFunction(body)
                const { email, recaptcha } = body
                await sendEmail(email, message, subject, recaptcha, to)
                log.info("Email sent", body)
                return json({ status: "success" })
            } catch (e) {
                const error = typeof e === "string" ? e : e instanceof Error ? e.message : JSON.stringify(e)
                log.error("Email error", { error, ...body })
                return json({ status: "error", error }, 500)
            }
        },
    })
}
