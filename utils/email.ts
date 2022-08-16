import sendgrid from "@sendgrid/mail"
import { GetServerSideProps } from "next"
import { handle, json } from "next-runtime"

type PageProps = {}
type UrlQuery = {}

async function sendEmail(email: string, message: string, data: Record<string, any>) {
    if (!data.recaptcha) {
        // eslint-disable-next-line functional/no-throw-statement
        throw new Error("No recaptcha")
    }
    const verify = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_BACKEND}&response=${data.recaptcha}`,
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
        text: `
${message}

------------------------------------------------------

${JSON.stringify(data)}`,
    })
}

export function handleEmail<
    T extends { readonly email: string; readonly message: string; readonly recaptcha: string },
>(): GetServerSideProps {
    return handle<PageProps, UrlQuery, T>({
        async get() {
            return json({})
        },
        async post({ req: { body } }) {
            try {
                const { email, message, ...rest } = body
                await sendEmail(email, message, rest)
                return json({ status: "success" })
            } catch (e) {
                return json({ status: "error", error: e }, 500)
            }
        },
    })
}
