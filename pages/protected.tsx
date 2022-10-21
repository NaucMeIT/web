import type { GetServerSideProps, NextPage } from "next"
import { unstable_getServerSession } from "next-auth/next"
import { signOut } from "next-auth/react"
import { authOptions } from "./api/auth/[...nextauth]"
import { Button } from "../components/Button"
import { useTrackedUser } from "../hooks/useTrackedUser"
import { useRouter } from "next/router"

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

    return {
        props: {},
    }
}

const Protected: NextPage = () => {
    const router = useRouter()
    const logout = async () => {
        const data = await signOut({ redirect: false, callbackUrl: "/sign" })
        router.push(data.url)
    }
    const [user] = useTrackedUser()

    return (
        <div>
            Protected
            <pre>{JSON.stringify(user, null, 4)}</pre>
            <Button theme='main' onClick={logout}>
                Odhlásit se
            </Button>
        </div>
    )
}

export default Protected
