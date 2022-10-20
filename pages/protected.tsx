import type { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { signOut } from "next-auth/react"
import splitbee from "@splitbee/web"
import { useEffect } from "react"
import { Plan } from "@prisma/client"
import { authOptions } from "./api/auth/[...nextauth]"
import { prisma } from "../utils/prisma"
import { Button } from "../components/Button"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

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

    return {
        props: {
            session: {
                ...session,
                user: {
                    ...session.user,
                    ...user,
                },
            },
        },
    }
}

const Protected: NextPage<{ readonly session: Session & { readonly user: { readonly plan: Plan } } }> = ({
    session,
}) => {
    useEffect(() => {
        splitbee.user.set({
            name: session.user?.name,
            plan: session.user?.plan.name,
        })
    })

    const logout = () => {
        splitbee.reset()
        signOut({ callbackUrl: "/sign" })
    }

    return (
        <div>
            Protected
            <pre>{JSON.stringify(session, null, 4)}</pre>
            <Button theme='main' onClick={logout}>
                Odhlásit se
            </Button>
        </div>
    )
}

export default Protected
