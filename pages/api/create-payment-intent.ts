import { Plan } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"
import createStripe from "stripe"
import { prisma } from "../../utils/prisma"

const stripe = new createStripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-08-01", typescript: true })

const getPlan = async (planId: string) => {
    const plan = await prisma.plan.findFirst({
        where: {
            id: planId,
        },
    })

    return plan
}

const calculatePlanPrice = async (plan: Plan | null) => {
    return plan?.price || 0
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { planId } = req.body
    const plan = await getPlan(planId)
    const amount = await calculatePlanPrice(plan)

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "czk",
        automatic_payment_methods: {
            enabled: true,
        },
    })

    res.send({
        clientSecret: paymentIntent.client_secret,
        amount,
        plan,
    })
}
