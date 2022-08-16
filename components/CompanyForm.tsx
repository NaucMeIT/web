import { DecoratedInput } from "./DecoratedInput"
import { FormWrapper } from "./FormWrapper"

export function CompanyForm() {
    return (
        <FormWrapper text='Máte zájem o zaměstnance? Rádi byste si domluvili schůzku a zjistili podrobnosti? Zanechte nám na sebe kontakt případně napište na email:'>
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
        </FormWrapper>
    )
}
