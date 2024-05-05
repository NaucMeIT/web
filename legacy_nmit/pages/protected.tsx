import type { GetServerSideProps, NextPage } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "./api/auth/[...nextauth]"
import { Button } from "../components/Button"
import { useTrackedUser } from "../hooks/useTrackedUser"

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)

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
    const [user, { logout }] = useTrackedUser()

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
