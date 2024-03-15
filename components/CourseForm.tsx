import { DecoratedInput } from "./DecoratedInput"
import { FormWrapper } from "./FormWrapper"

export function CourseForm() {
    return (
        <FormWrapper
            className='w-10/12 md:w-6/12 mt-36'
            type='course'
            text='Pokud se chceš přihlásit, nebo si nejsi něčím jistý nebo máš další otázky? Neboj se nám zavolat, poslat zprávu nebo napsat na email:'
        >
            <DecoratedInput name='name' type='text' label='Vaše jméno' placeholder='Zadejte své jméno' required />
            <DecoratedInput name='email' type='email' label='Váš e-mail' placeholder='Zadejte svůj email' required />
            <DecoratedInput
                name='package'
                label='Balíček'
                placeholder='Jaký balíček chcete?'
                required
                list='packages-list'
                title='Vyberte jeden z balíčků'
            />
            <DecoratedInput
                name='message'
                component='textarea'
                rows={10}
                label='Vzkaz (nepovinné)'
                placeholder='Chcete nám něco vzkázat?'
                className='resize-vertical min-h-28'
            />
        </FormWrapper>
    )
}
