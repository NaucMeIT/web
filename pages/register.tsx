import Image from "next/image"
import type { NextPage } from "next"
import { Form, useFormSubmit } from "next-runtime/form"
import { Button, SocialButton } from "../components/Button"
import { DecoratedInput } from "../components/DecoratedInput"
import Google from "../images/google.svg"
import { Facebook } from "../components/icons"
import { signIn } from "next-auth/react"

const Login: NextPage = () => {
    const { isSubmitting } = useFormSubmit()

    const signInWithFacebook = () => {
        signIn("facebook", {
            callbackUrl: window.location.href,
        })
    }

    const signInWithGoogle = () => {
        signIn("google", {
            callbackUrl: window.location.href,
        })
    }

    return (
        <div>
            <Form method='post' className='w-1/2 mx-auto flex flex-col gap-4'>
                <DecoratedInput name='name' type='text' label='Vaše jméno' placeholder='Zadejte své jméno' required />
                <DecoratedInput name='email' type='email' label='Váš email' placeholder='Zadejte svůj email' required />

                <div className='flex justify-between'>
                    <Button size='medium' type='submit' theme='off' className='w-fit self-end' disabled={isSubmitting}>
                        {isSubmitting ? "Registruji..." : "Registrovat"}
                    </Button>
                    <span className='border-2 border-primary opacity-50'></span>
                    <SocialButton onClick={signInWithFacebook} label='Registrovat pomocí Facebooku'>
                        <Facebook width={24} />
                    </SocialButton>
                    <SocialButton onClick={signInWithGoogle} label='Registrovat pomocí Google'>
                        <Image src={Google} width={24} height={24} alt='LinkedIn' />
                    </SocialButton>
                </div>
            </Form>
        </div>
    )
}

export default Login
