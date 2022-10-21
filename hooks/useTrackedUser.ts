import splitbee from "@splitbee/web"
import { useSession } from "next-auth/react"
import { useEffect } from "react"

export const useTrackedUser = () => {
    const { data, status } = useSession()

    useEffect(() => {
        if (status === "unauthenticated") {
            splitbee.track("logout")
            splitbee.reset()
        } else if (status === "authenticated") {
            splitbee.track("login")
            splitbee.user.set({
                userId: data?.user.email,
                name: data?.user.name,
                planId: data?.user.planId,
            })
        }
    }, [status, data?.user.email, data?.user.name, data?.user.planId])

    return [data?.user, status]
}
