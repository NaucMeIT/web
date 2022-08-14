import sendgrid from "@sendgrid/mail"

export async function sendEmail(email: string, message: string, data: Record<string, any>) {
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
