import splitbee from "@splitbee/web"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { AllowedOauth, AllowedProviders, shouldRedirect, SignStatus } from "../utils/session"

export const useTrackedUser = () => {
    const [signStatus, setSignStatus] = useState<SignStatus>("idle")
    const { data, status } = useSession()
    const router = useRouter()
    const startPlan = router.query.startPlan || "Basic"
    const regUrl = `/register?startPlan=${startPlan}`
    const signUrl = "/"

    const logout = async () => {
        const data = await signOut({ redirect: false, callbackUrl: signUrl })
        splitbee.track("Sign out")
        splitbee.reset()
        if (shouldRedirect(router.asPath)) {
            router.push(data.url)
        }
    }

    async function sign(provider: "email", email: string): Promise<void>
    async function sign(provider: AllowedOauth): Promise<void>
    async function sign(provider: AllowedProviders, email?: string): Promise<void> {
        try {
            const isEmail = provider === "email"
            setSignStatus("signing")
            const signInStatus = await signIn(provider, {
                callbackUrl: regUrl,
                redirect: !isEmail,
                email,
            })
            if (signInStatus?.error) {
                // eslint-disable-next-line functional/no-throw-statement
                throw new Error(signInStatus?.error)
            }
            setSignStatus(isEmail ? "send" : "oauth")
        } catch (e) {
            typeof e === "string" && splitbee.track("Sign error", { signError: e, email })
            setSignStatus("error")
        }
    }

    useEffect(() => {
        if (status === "authenticated" && data?.user.email) {
            splitbee.track("Sign success")
            splitbee.user.set({
                userId: data.user.email,
                name: data.user.name,
                planId: data.user.planId,
            })
        }
    }, [status, data?.user.email, data?.user.name, data?.user.planId])

    return [data?.user, { logout, sign, status: signStatus }] as const
}
