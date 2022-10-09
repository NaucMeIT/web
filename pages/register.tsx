import { NextPage } from "next"
import { Session, unstable_getServerSession } from "next-auth"
import { log } from "next-axiom"
import { handle, json, redirect } from "next-runtime"
import { Head } from "../components/Head"
import { ProfileDetailsForm } from "../components/ProfileDetailsForm"
import { authOptions } from "./api/auth/[...nextauth]"
import { prisma } from "../utils/prisma"

type PageProps = {}
type UrlQuery = {
    readonly startPlan: string
}

const skipIfUserInfo = async (session: Session | null) => {
    if (!session?.user) {
        return {
            redirect: {
                destination: "/sign",
                permanent: false,
            },
        }
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email || "",
        },
        select: {
            plan: true,
        },
    })

    if (session.user?.name && user?.plan) {
        return {
            redirect: {
                destination: "/protected",
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
            user,
        },
    }
}

export const getServerSideProps = handle<PageProps, UrlQuery, PageProps>({
    async get(context) {
        const session = await unstable_getServerSession(context.req, context.res, authOptions)
        return skipIfUserInfo(session)
    },
    async post({ req: { body, url, headers } }) {
        try {
            const parsedUrl = new URL(url || "", `https://${headers.host}`)
            const plan = parsedUrl.searchParams.get("startPlan")
            if (!["Basic", "Core", "Standard", "Ultimate"].includes(plan || "")) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error("Tento plán neexistuje")
            }
            return redirect("/protected")
        } catch (e) {
            const error = typeof e === "string" ? e : JSON.stringify(e)
            log.error("Email error", { error: error, ...body })
            return json({ status: "error", error }, 500)
        }
    },
})

const Register: NextPage = () => {
    return (
        <div className='flex gap-6 flex-col justify-center min-h-screen'>
            <Head
                desc='Chceš získat práci v IT a nevíš, jak začít? Právě proto jsme tu my! Na naší platformě poskytujeme kurzy, díky kterým získáš práci v IT dřív než řekneš Java.'
                url='https://naucme.it/'
                twImg='https://naucme.it/twitter.png'
                fbImg='https://naucme.it/og.png'
            >
                <title>Nauč mě IT - Registrace - krok 2</title>
            </Head>
            <ProfileDetailsForm buttonText='Uložit' />
        </div>
    )
}

export default Register
