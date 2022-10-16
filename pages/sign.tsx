import Image from "next/image"
import type { NextPage } from "next"
import { Button, SocialButton } from "../components/Button"
import { DecoratedInput } from "../components/DecoratedInput"
import Google from "../images/google.svg"
import { Facebook } from "../components/icons"
import { signIn } from "next-auth/react"
import { FormEvent, useState } from "react"
import { Typography } from "../components/Typography"
import { EmailLink } from "../components/EmailLink"
import { useRouter } from "next/router"
import { Head } from "../components/Head"
import { handle, json, redirect } from "next-runtime"
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "./api/auth/[...nextauth]"

type Status = "idle" | "signing" | "error" | "send"

export const getServerSideProps = handle<{}, {}, {}>({
    async get(context) {
        const session = await unstable_getServerSession(context.req, context.res, authOptions)
        if (session) {
            return redirect("/protected")
        }
        return json({})
    },
})

const Sign: NextPage = () => {
    const router = useRouter()
    const startPlan = router.query.startPlan || "Basic"
    const callbackUrl = `/register?startPlan=${startPlan}`

    const [status, setStatus] = useState<Status>("idle")
    const signInWithFacebook = () => {
        signIn("facebook", {
            callbackUrl,
        })
    }

    const signInWithGoogle = () => {
        signIn("google", {
            callbackUrl,
        })
    }

    const signInWithEmail = async (e: FormEvent<HTMLFormElement>) => {
        try {
            setStatus("signing")
            e.preventDefault()
            // Typescript doesn't infer elements correctly
            const email = (e.currentTarget.elements as Record<string, any>).email?.value
            await signIn("email", {
                callbackUrl,
                email,
                redirect: false,
            })
            setStatus("send")
        } catch (e) {
            console.error(e)
            setStatus("error")
        }
    }

    return (
        <div className='flex flex-col justify-center h-[100vh]'>
            <Head
                desc='Chceš získat práci v IT a nevíš, jak začít? Právě proto jsme tu my! Na naší platformě poskytujeme kurzy, díky kterým získáš práci v IT dřív než řekneš Java.'
                url='https://naucme.it/'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/og.png'
            >
                <title>Nauč mě IT - Přihlášení</title>
            </Head>
            <form className='w-3/4 lg:w-1/2 mx-auto flex flex-col gap-4 group' onSubmit={signInWithEmail}>
                <DecoratedInput name='email' type='email' label='Váš email' placeholder='Zadejte svůj email' required />
                {status === "error" && (
                    <Typography variant='error' className='text-center'>
                        Nastala chyba, zkuste to za chvíli znovu, případně nám napište na{" "}
                        <EmailLink subject='Chyba na webu Nauč mě IT' email='info@naucme.it' />!
                    </Typography>
                )}
                {status === "send" && (
                    <Typography variant='normal' className='text-center'>
                        Email s přihlašovacím odkazem byl odeslán!
                    </Typography>
                )}

                <div className='flex flex-wrap justify-center gap-5'>
                    <Button
                        size='medium'
                        type='submit'
                        theme='off'
                        className='w-fit self-start group-invalid:opacity-50 group-invalid:pointer-events-none'
                        disabled={status === "signing"}
                    >
                        {status === "signing" ? "Přihlašuji..." : "Přihlásit"}
                    </Button>
                    <span className='w-full border-2 border-primary opacity-50'></span>
                    <SocialButton onClick={signInWithFacebook} label='Registrovat pomocí Facebooku'>
                        <Facebook width={24} />
                    </SocialButton>
                    <SocialButton onClick={signInWithGoogle} label='Registrovat pomocí Google'>
                        <Image src={Google} width={24} height={24} alt='LinkedIn' />
                    </SocialButton>
                </div>
            </form>
        </div>
    )
}

export default Sign
