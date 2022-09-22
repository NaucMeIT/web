import type { GetServerSideProps, NextPage } from "next"
import { authOptions } from "./api/auth/[...nextauth]"
import { unstable_getServerSession } from "next-auth/next"
import { Session } from "next-auth"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await unstable_getServerSession(context.req, context.res, authOptions)

    if (!session) {
        return {
            redirect: {
                destination: "/",
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
    return <div>Protected - {JSON.stringify(session)}</div>
}

export default Login
