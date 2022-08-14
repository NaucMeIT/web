import sendgrid from "@sendgrid/mail"
import { GetServerSideProps } from "next"
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

export const handleEmail: GetServerSideProps = handle<
    PageProps,
    UrlQuery,
    { readonly email: string; readonly message: string }
>({
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
