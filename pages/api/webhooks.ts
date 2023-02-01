import { NextApiRequest, NextApiResponse } from "next"
import createStripe from "stripe"
import bodyParser from "body-parser"
import { log } from "next-axiom"
import { PaymentStatus } from "@prisma/client"
import { prisma } from "../../utils/prisma"

const stripe = new createStripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-11-15", typescript: true })
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || ""

function runMiddleware(req: Readonly<NextApiRequest>, res: Readonly<NextApiResponse>, fn: Readonly<Function>) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result: Readonly<Object>) => {
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

export default async function handler(req: Readonly<NextApiRequest>, res: Readonly<NextApiResponse<{}>>) {
    await runMiddleware(req, res, bodyParser.raw({ type: "application/json" }))

    try {
        const signature = req.headers["stripe-signature"]

        const event = stripe.webhooks.constructEvent(req.body, signature as string, endpointSecret)
        const paymentIntent = event.data.object as Record<string, any>
        const {
            metadata: { planId, userEmail },
            amount,
        } = paymentIntent

        switch (event.type) {
            case "payment_intent.succeeded":
                await handlePaymentIntentSucceeded(planId, userEmail)
                console.log(`PaymentIntent for ${amount} was successful!`)
                break
            case "payment_intent.processing":
                await handlePaymentIntentInProgress(userEmail)
                console.log(`PaymentIntent for ${amount} is in process!`)
                break
            case "payment_intent.payment_failed":
                await handlePaymentIntentFailed(userEmail)
                console.log(`PaymentIntent for ${amount} failed!`)
                break
            default:
                // Unexpected event type
                log.error(`Unexpected Stripe event type ${event.type}.`)
        }
    } catch (error) {
        return res.status(400).json({ error })
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

async function handlePaymentIntentFailed(email: string) {
    const user = await prisma.user.findFirst({ where: { email } })
    if (!user) return

    await prisma.user.update({
        where: { email },
        data: { paymentStatus: PaymentStatus.Failed },
    })
}
