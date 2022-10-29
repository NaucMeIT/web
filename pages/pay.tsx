import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

import CheckoutForm from "../components/CheckoutForm"
import { NextPage } from "next"
import { Typography } from "../components/Typography"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "")

const Pay: NextPage = () => {
    const [clientSecret, setClientSecret] = React.useState("")

    React.useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        fetch("/api/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ planId: "cl9ac83yn000509mh606b3p8i" }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret))
    }, [])

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
            {clientSecret && (
                <>
                    <Typography variant='h3' className='mb-4 text-center'>
                        Vybrán plán X
                    </Typography>
                    <Typography className='mb-6 text-center'>
                        Cena pro vás je YYYY Kč. Detaily plánu zjistíte na svém profilu.
                    </Typography>
                    <Elements options={options} stripe={stripePromise}>
                        <CheckoutForm />
                    </Elements>
                </>
            )}
        </div>
    )
}

export default Pay
