import sendgrid from "@sendgrid/mail"
import { handle, json } from "next-runtime"

type PageProps = {}
type UrlQuery = {}

async function sendEmail(email: string, message: string, data: Record<string, any>) {
    await sendgrid.setApiKey(process.env.SENDGRID_API_KEY || "")
    await sendgrid.send({
        to: "info@naucme.it",
        from: "info@naucme.it",
        replyTo: email,
        subject: "B2B Nauč mě IT",
        text: `
${message}

------------------------------------------------------

${JSON.stringify(data)}`,
    })

    return { status: "success" }
}

export async function handleEmail<T extends { readonly email: string; readonly message: string }>() {
    return handle<PageProps, UrlQuery, T>({
        async get() {
            return json({})
        },
        async post({ req: { body } }) {
            try {
                const { email, message, ...rest } = body
                sendEmail(email, message, rest)
                return json({ status: "success" })
            } catch (e) {
                return json({ status: "error", error: e }, 500)
            }
        },
    })
}
