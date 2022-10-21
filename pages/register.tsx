import { NextPage } from "next"
import { Session, unstable_getServerSession } from "next-auth"
import { log } from "next-axiom"
import { handle, json } from "next-runtime"
import { Head } from "../components/Head"
import { ProfileDetailsForm } from "../components/ProfileDetailsForm"
import { authOptions } from "./api/auth/[...nextauth]"
import { prisma } from "../utils/prisma"
import { Plan } from "@prisma/client"

type PageProps = {
    readonly session: Session
    readonly user: {
        readonly plan: Plan | null
    }
}
type UrlQuery = {
    readonly startPlan: string
}
type FormData = {
    readonly name: string
}

const skipIfUserInfo = async (session: Session | null, startPlan: string | readonly string[] | undefined) => {
    if (!session?.user) {
        return {
            redirect: {
                destination: "/sign",
                permanent: false,
            },
        }
    }

    if (session.user?.name && session.user?.planId) {
        return {
            redirect: {
                destination: "/protected",
                permanent: false,
            },
        }
    }

    if (!startPlan) {
        return {
            redirect: {
                destination: "?startPlan=Basic",
                permanent: false,
            },
        }
    }
    if (Array.isArray(startPlan)) {
        return {
            redirect: {
                destination: `?startPlan=${startPlan[0]}`,
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
        },
    }
}

export const getServerSideProps = handle<{}, UrlQuery, FormData>({
    async get(context) {
        const session = await unstable_getServerSession(context.req, context.res, authOptions)
        return skipIfUserInfo(session, context.query?.startPlan)
    },
    async post(context) {
        const {
            req: { body, url, headers },
        } = context
        try {
            const parsedUrl = new URL(url || "", `https://${headers.host}`)
            const plan = parsedUrl.searchParams.get("startPlan") || ""
            const dbPlan = await prisma.plan.findFirst({ where: { name: plan } })
            if (!dbPlan) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error("Tento plán neexistuje.")
            }

            const session = await unstable_getServerSession(context.req, context.res, authOptions)
            await prisma.user.update({
                where: { email: session?.user?.email || "" },
                data: { planId: dbPlan.id, name: body.name },
            })

            return {
                redirect: {
                    destination: "/protected",
                    permanent: false,
                },
            }
        } catch (e) {
            const error = typeof e === "string" ? e : JSON.stringify(e)
            log.error("Register error", { error: error, ...body })
            return json({ status: "error", error }, 500)
        }
    },
})

const Register: NextPage<PageProps> = ({ session }) => {
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
            <ProfileDetailsForm name={session.user?.name || ""} />
        </div>
    )
}

export default Register
