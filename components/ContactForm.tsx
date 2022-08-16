import { Form, useFormSubmit } from "next-runtime/form"
import { Button } from "./Button"
import { DecoratedInput } from "./DecoratedInput"
import { Typography } from "./Typography"
import { EmailLink } from "./EmailLink"
import { useRecaptcha } from "../hooks/useRecaptcha"

export function ContactForm() {
    const { isSubmitting, isSuccess, isError } = useFormSubmit()
    const token = useRecaptcha()

    if (isSuccess) {
        return (
            <div className='flex flex-col items-center justify-center gap-4'>
                <Typography variant='h2'>Děkujeme za zprávu!</Typography>
                <Typography variant='normal'>Budeme Vás kontaktovat co nejdříve.</Typography>
            </div>
        )
    }

    return (
        <Form className='mx-auto flex w-10/12 flex-col gap-y-4 md:w-6/12' method='post'>
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
                    Nejste si něčím jistí nebo máte další otázky? Nebojte se nám zavolat, poslat zprávu nebo napsat na
                    email: <EmailLink email='info@naucme.it' />
                </Typography>
            )}
            <DecoratedInput name='name' type='text' label='Vaše jméno' placeholder='Zadejte své jméno' required />
            <div className='flex flex-col gap-9 md:flex-row'>
                <DecoratedInput
                    name='email'
                    type='email'
                    label='Váš e-mail'
                    placeholder='Zadejte svůj email'
                    required
                />
                <DecoratedInput
                    name='phone'
                    type='tel'
                    pattern='^[+]?[()/0-9. -]{9,}$'
                    label='Vaše telefonní číslo'
                    placeholder='Zadejte svoje číslo (např. +420 705 123 456)'
                />
            </div>
            <DecoratedInput
                name='message'
                component='textarea'
                rows={10}
                label='Vaše zpráva'
                placeholder='Zadejte svoji zprávu...'
                required
                className='resize-vertical min-h-28'
            />
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
