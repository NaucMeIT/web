import React, { FormEvent } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "./Button"

export default function CheckoutForm() {
    const stripe = useStripe()
    const elements = useElements()

    const [message, setMessage] = React.useState<string | undefined>(undefined)
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        if (!stripe) {
            return
        }

        const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret")

        if (!clientSecret) {
            return
        }

        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setMessage("Platba proběhla úspěšně!")
                    break
                case "processing":
                    setMessage("Probíhá platba.")
                    break
                case "requires_payment_method":
                    setMessage("Platba nebyla úspěšná, prosím zkuste to znovu.")
                    break
                default:
                    setMessage("Něco se pokazilo, omlouváme se. :(")
                    break
            }
        })
    }, [stripe])

    const handleSubmit = async (e: Readonly<FormEvent<HTMLFormElement>>) => {
        e.preventDefault()

        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return
        }

        setIsLoading(true)

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/dashboard`,
            },
        })

        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your `return_url`. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the `return_url`.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message)
        } else {
            setMessage("Nastala neočekávaná chyba, moc se omlouváme. :(")
        }

        setIsLoading(false)
    }

    return (
        <form id='payment-form' className='group' onSubmit={handleSubmit}>
            <PaymentElement id='payment-element' />
            <div className='flex flex-row-reverse gap-4 justify-between mt-4'>
                <Button
                    disabled={isLoading || !stripe || !elements}
                    size='large'
                    id='submit'
                    type='submit'
                    theme='main'
                    className='w-fit group-invalid:opacity-50 group-invalid:pointer-events-none'
                >
                    {isLoading ? "Probíhá placení" : "Zaplatit"}
                </Button>
                <Button size='large' theme='off' className='w-fit' href='/chapter/qa-00'>
                    Přeskočit
                </Button>
            </div>
            {/* Show any error or success messages */}
            {message && <div id='payment-message'>{message}</div>}
        </form>
    )
}
