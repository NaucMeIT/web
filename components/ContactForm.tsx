import { Button } from "./Button"
import { DecoratedInput } from "./DecoratedInput"
import { Typography } from "./Typography"

export function ContactForm() {
    return (
        <form className='mx-auto flex w-10/12 flex-col gap-y-4 md:w-6/12'>
            <span id='contact'>&nbsp;</span>
            <Typography variant='h2' component='h2' className='mx-auto mb-4'>
                Napište nám
            </Typography>
            <Typography component='p' className='mx-auto max-w-prose text-center'>
                Nejste si něčím jistí nebo máte další otázky? Nebojte se nám zavolat, poslat zprávu nebo napsat na
                email: info@naucme.it.
            </Typography>
            <DecoratedInput type='text' label='Vaše jméno' placeholder='Zadejte své jméno' required />
            <div className='flex flex-col gap-9 md:flex-row'>
                <DecoratedInput type='email' label='Váš e-mail' placeholder='Zadejte svůj email' required />
                <DecoratedInput
                    type='tel'
                    pattern='^[+]?[()/0-9. -]{9,}$'
                    label='Vaše telefonní číslo'
                    placeholder='Zadejte svoje číslo (např. +420 705 123 456)'
                />
            </div>
            <DecoratedInput
                component='textarea'
                rows={10}
                label='Vaše zpráva'
                placeholder='Zadejte svoji zprávu...'
                required
                className='resize-vertical min-h-28'
            />
            <Button size='large' type='submit' theme='off' className='w-fit self-end'>
                Odeslat zprávu
            </Button>
        </form>
    )
}
