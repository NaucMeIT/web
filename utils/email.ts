import sendgrid from "@sendgrid/mail"
import { GetServerSideProps } from "next"
import { handle, json } from "next-runtime"
import { log } from "next-axiom"

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

async function sendEmail(email: string, message: string, recaptcha: string) {
    if (!recaptcha) {
        log.error("No recaptcha token")
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error("No recaptcha")
    }
    const verify = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_BACKEND}&response=${recaptcha}`,
        {
            method: "POST",
        },
    ).then((res) => res.json())
    if (!verify.success) {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error("Recaptcha failed")
    }

    await sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "")
    await sendgrid.send({
        to: "info@naucme.it",
        from: "info@naucme.it",
        replyTo: email,
        subject: "B2B Nauč mě IT",
        text: message,
    })
}

export function handleEmail<
    T extends { readonly email: string; readonly message: string | undefined; readonly recaptcha: string },
>(formatFunction: (data: T) => string): GetServerSideProps {
    return handle<PageProps, UrlQuery, T>({
        async get() {
            return json({})
        },
        async post({ req: { body } }) {
            try {
                const message = formatFunction(body)
                const { email, recaptcha } = body
                await sendEmail(email, message, recaptcha)
                log.info("Email sent", body)
                return json({ status: "success" })
            } catch (e) {
                const error = typeof e === "string" ? e : JSON.stringify(e)
                log.error("Email error", { error: error, ...body })
                return json({ status: "error", error }, 500)
            }
        },
    })
}
