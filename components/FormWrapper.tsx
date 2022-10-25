import { Form, useFormSubmit } from "next-runtime/form"
import { Button } from "./Button"
import { Typography } from "./Typography"
import { EmailLink } from "./EmailLink"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { EmailThanks } from "./EmailThanks"
import { useId } from "react"

// eslint-disable-next-line functional/no-mixed-type
type FormWrapperProps = {
    readonly children: React.ReactNode
    readonly text: string
    readonly className?: string
    readonly type: "index" | "company" | "error"
    // eslint-disable-next-line functional/no-return-void
    readonly onSuccess?: () => void
}

export function FormWrapper({ children, text, type, className, onSuccess }: FormWrapperProps) {
    const formId = useId()
    const formName = `${type}-${formId}`
    const { isSubmitting, isSuccess, isError } = useFormSubmit(formName)
    const [token, generateToken] = useRecaptcha()

    return (
        <Form
            data-splitbee-event='Contact us form'
            className={`mx-auto flex flex-col gap-y-4 ${className || ""}`}
            method='post'
            action={`/email/${type}`}
            onFocus={generateToken}
            onSuccess={() => onSuccess?.()}
            name={formName}
        >
            {isSuccess ? (
                <EmailThanks />
            ) : (
                <>
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
                            Email se nepodařilo odeslat, zkuste to prosím znovu. Případně nám neváhejte zavolat či
                            napsat na email: <EmailLink email='info@naucme.it' />
                        </Typography>
                    )}
                    {!isError && (
                        <Typography component='p' className='mx-auto max-w-prose text-center'>
                            {text} <EmailLink email='info@naucme.it' />
                        </Typography>
                    )}
                </>
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
