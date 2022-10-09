import type { GetServerSideProps, NextPage } from "next"
import { authOptions } from "./api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"
import { Session } from "next-auth"
import { Button } from "../components/Button"
import { signOut } from "next-auth/react"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: "/sign",
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

const Login: NextPage<{ readonly session: Session }> = ({ session }) => {
    return (
        <div>
            Protected
            <pre>{JSON.stringify(session, null, 4)}</pre>
            <Button theme='main' onClick={() => signOut({ callbackUrl: "/sign" })}>
                Odhlásit se
            </Button>
        </div>
    )
}

export default Login
