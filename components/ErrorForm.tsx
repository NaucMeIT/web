import { Session } from "next-auth"
import { DecoratedInput } from "./DecoratedInput"
import { FormWrapper } from "./FormWrapper"
import { useRouter } from "next/router"

// eslint-disable-next-line functional/no-mixed-types
type Props = {
    readonly user: Session["user"]
    // eslint-disable-next-line functional/no-return-void
    readonly onSuccess: () => void
}

export function ErrorForm({ user, onSuccess }: Props) {
    const router = useRouter()

    return (
        <FormWrapper onSuccess={onSuccess} type='error' text='Našli jste chybu? Neváhejte nám ji nahlásit!'>
            <input type='hidden' id='chapter' name='chapter' value={router?.query.post || ""} />
            <input type='hidden' id='name' name='name' value={user?.name || ""} />
            <input type='hidden' id='email' name='email' value={user?.email || ""} />
            <DecoratedInput
                name='message'
                component='textarea'
                rows={10}
                label='Nalezená chyba'
                placeholder='Popište chybu, kterou jste nalezli...'
                required
                className='resize-vertical min-h-28'
            />
        </FormWrapper>
    )
}
