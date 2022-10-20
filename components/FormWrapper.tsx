import { Form, useFormSubmit } from "next-runtime/form"
import { Button } from "./Button"
import { Typography } from "./Typography"
import { EmailLink } from "./EmailLink"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { EmailThanks } from "./EmailThanks"

type FormWrapperProps = {
    readonly children: React.ReactNode
    readonly text: string
}

export function FormWrapper({ children, text }: FormWrapperProps) {
    const { isSubmitting, isSuccess, isError } = useFormSubmit()
    const [token, generateToken] = useRecaptcha()

    if (isSuccess) {
        return <EmailThanks />
    }

    return (
        <Form
            data-splitbee-event='Contact us form'
            className='mx-auto flex w-10/12 flex-col gap-y-4 md:w-6/12 mt-36'
            method='post'
            onFocus={generateToken}
        >
            <span id='contact'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mx-auto mb-4'>
                Napište nám
            </Typography>
            {isError && (
                <Typography
                    component='p'
                    variant='error'
                    className='mx-auto max-w-prose text-center'
                    componentProps={{ role: "alert" }}
                >
                    Email se nepodařilo odeslat, zkuste to prosím znovu. Případně nám neváhejte zavolat či napsat na
                    email: <EmailLink email='info@naucme.it' />
                </Typography>
            )}
            {!isError && (
                <Typography component='p' className='mx-auto max-w-prose text-center'>
                    {text} <EmailLink email='info@naucme.it' />
                </Typography>
            )}

            {children}

            <input type='hidden' id='recaptcha' name='recaptcha' value={token} />
            <Typography variant='form' className='text-center'>
                Tato stránka je chráněna reCAPTCHA, platí
                <a href='https://policies.google.com/privacy'> zásady ochrany osobních údajů</a> a
                <a href='https://policies.google.com/terms'> smluvní podmínky</a> společnosti Google.
            </Typography>
            <Button size='large' type='submit' theme='off' className='w-fit self-end' disabled={isSubmitting}>
                {isSubmitting ? "Odesílám" : "Odeslat zprávu"}
            </Button>
        </Form>
    )
}
