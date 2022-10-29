import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import createStripe from "stripe"
import CheckoutForm from "../components/CheckoutForm"
import { NextPage } from "next"
import { Typography } from "../components/Typography"
import type { GetServerSideProps } from "next"
import { Plan } from "@prisma/client"
import { prisma } from "../utils/prisma"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

const getPlan = async (planId: string) => {
    const plan = await prisma.plan.findFirst({
        where: {
            id: planId,
        },
    })

    return plan
}

const calculatePlanPrice = async (plan: Plan) => {
    return plan.price
}

const registerRedirect = {
    redirect: {
        destination: "/register",
        statusCode: 302,
    },
} as const

export const getServerSideProps: GetServerSideProps = async (context) => {
    const stripe = new createStripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2022-08-01", typescript: true })
    const session = await unstable_getServerSession(context.req, context.res, authOptions)
    const planId = session?.user.planId

    if (!planId) {
        return registerRedirect
    }

    const plan = await getPlan(planId)

    if (!plan) {
        return registerRedirect
    }

    const amount = await calculatePlanPrice(plan)

    const { client_secret: clientSecret } = await stripe.paymentIntents.create({
        amount,
        currency: "czk",
        automatic_payment_methods: {
            enabled: true,
        },
    })

    return {
        props: {
            clientSecret,
            plan,
        },
    }
}

const Pay: NextPage<{ readonly plan: Plan; readonly clientSecret: string }> = ({ plan, clientSecret }) => {
    const appearance = {
        theme: "stripe",
        labels: "floating",
        variables: {
            colorPrimary: "#eb48f7",
            colorText: "white",
            colorBackground: "#0a0c26",
            colorDanger: "#df1b41",
            fontFamily: "Poppins, system-ui, sans-serif",
            spacingUnit: "0.3rem",
            borderRadius: "0px",
            borderColor: "#eb48f7",
            colorIconCardCvc: "#eb48f7",
            colorIconCardCvcError: "#df1b41",
            colorIcon: "#eb48f7",
            colorIconSelectArrow: "#eb48f7",
        },
    } as const
    const options = {
        clientSecret,
        appearance,
    }

    return (
        <div className='w-full max-w-lg mx-auto px-4 min-h-screen flex flex-col justify-center'>
            <Typography variant='h3' className='mb-4 text-center'>
                Vybrán plán {plan.name}
            </Typography>
            <Typography className='mb-6 text-center'>
                Cena pro vás je {plan.price} Kč. Detaily plánu zjistíte na svém profilu.
            </Typography>
            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>
    )
}

export default Pay
