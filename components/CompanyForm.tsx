import { Form, useFormSubmit } from "next-runtime/form"
import { Button } from "./Button"
import { DecoratedInput } from "./DecoratedInput"
import { Typography } from "./Typography"
import { EmailLink } from "./EmailLink"
import { useRecaptcha } from "../hooks/useRecaptcha"
import { EmailThanks } from "./EmailThanks"

export function CompanyForm() {
    const { isSubmitting, isSuccess, isError } = useFormSubmit()
    const token = useRecaptcha()

    if (isSuccess) {
        return <EmailThanks />
    }

    return (
        <Form className='mx-auto flex w-10/12 flex-col gap-y-4 md:w-6/12 mt-36' method='post'>
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
                    Máte zájem o zaměstnance? Rádi byste si domluvili schůzku a zjistili podrobnosti? Zanechte nám na
                    sebe kontakt případně napište na email: <EmailLink email='info@naucme.it' />
                </Typography>
            )}
            <DecoratedInput name='name' type='text' label='Vaše jméno' placeholder='Zadejte své jméno' required />
            <DecoratedInput name='company' type='text' label='Firma' placeholder='Zadejte jméno firmy' required />
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
                name='employee'
                type='text'
                label='Pozice zaměstnance'
                placeholder='Jakého zaměstnance hledám?'
                required
            />
            <DecoratedInput
                name='message'
                component='textarea'
                rows={5}
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
