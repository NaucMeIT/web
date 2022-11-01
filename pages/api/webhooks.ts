import { NextApiRequest, NextApiResponse } from "next"
import createStripe from "stripe"
import bodyParser from "body-parser"
import { log } from "next-axiom"
import { PaymentStatus } from "@prisma/client"

const stripe = new createStripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-08-01", typescript: true })
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: Object) => {
            if (result instanceof Error) {
                return reject(result)
            }

            return resolve(result)
        })
    })
}

export const config = {
    api: {
        bodyParser: false,
    },
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<{}>) {
    await runMiddleware(req, res, bodyParser.raw({ type: "application/json" }))

    try {
        const signature = req.headers["stripe-signature"]

        const event = await stripe.webhooks.constructEventAsync(req.body, signature as string, endpointSecret)
        const paymentIntent = event.data.object as { readonly amount: number }
        const { planId, userEmail } = (event.data as Record<string, any>).metadata

        switch (event.type) {
            case "payment_intent.succeeded":
                console.log(`PaymentIntent for ${JSON.stringify(paymentIntent.amount)} was successful!`)
                handlePaymentIntentSucceeded(planId, userEmail)
                break
            case "payment_intent.created":
                console.log(`PaymentIntent for ${JSON.stringify(paymentIntent.amount)} was created!`)
                handlePaymentIntentInProgress(userEmail)
                break
            case "charge.succeeded":
                console.log(`Charge for ${JSON.stringify(paymentIntent.amount)} succeeded!`)
                break
            default:
                // Unexpected event type
                log.error(`Unexpected Stripe event type ${event.type}.`)
        }
    } catch (e) {
        return res.status(400).json({ error: "Webhook error" })
    }

    res.status(200).json({})
}

async function handlePaymentIntentSucceeded(id: string, email: string) {
    const plan = await prisma.plan.findFirst({ where: { id } })
    const user = await prisma.user.findFirst({ where: { email } })
    if (!plan || !user) return

    await prisma.user.update({
        where: { email },
        data: { credits: user.credits + plan.credits, paymentStatus: PaymentStatus.Done },
    })
}

async function handlePaymentIntentInProgress(email: string) {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) return

    await prisma.user.update({
        where: { email },
        data: { paymentStatus: PaymentStatus.InProgress },
    })
}
