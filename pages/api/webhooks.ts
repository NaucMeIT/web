import { NextApiRequest, NextApiResponse } from "next"
import createStripe from "stripe"
import bodyParser from "body-parser"
import { log } from "next-axiom"

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

        const event = stripe.webhooks.constructEvent(req.body, signature as string, endpointSecret)
        const paymentIntent = event.data.object as { readonly amount: number }

        switch (event.type) {
            case "payment_intent.succeeded":
                console.log(`PaymentIntent for ${JSON.stringify(paymentIntent.amount)} was successful!`)
                // Then define and call a method to handle the successful payment intent.
                // handlePaymentIntentSucceeded(paymentIntent);
                break
            case "payment_intent.created":
                console.log(`PaymentIntent for ${JSON.stringify(paymentIntent.amount)} was created!`)
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
