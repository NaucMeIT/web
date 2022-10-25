import { DecoratedInput } from "./DecoratedInput"
import { FormWrapper } from "./FormWrapper"

export function ContactForm() {
    return (
        <FormWrapper
            className='w-10/12 md:w-6/12 mt-36'
            type='index'
            text='Nejste si něčím jistí nebo máte další otázky? Nebojte se nám zavolat, poslat zprávu nebo napsat na email:'
        >
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
        </FormWrapper>
    )
}
