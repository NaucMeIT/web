import posthog from "posthog-js"
import splitbee from "@splitbee/web"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { type AllowedOauth, type AllowedProviders, shouldRedirect, type SignStatus } from "../utils/session"

export const useTrackedUser = () => {
    const [signStatus, setSignStatus] = useState<SignStatus>("idle")
    const { data, status } = useSession()
    const router = useRouter()
    const startPlan = router?.query.startPlan || "Basic"
    const regUrl = `/profile/edit?startPlan=${startPlan}`
    const signUrl = "/"

    const logout = async () => {
        const data = await signOut({ redirect: false, callbackUrl: signUrl })
        splitbee.track("Sign out")
        splitbee.reset()
        posthog.capture("Sign out")
        posthog.reset()
        if (router && shouldRedirect(router.asPath)) {
            router.push(data.url)
        }
    }

    async function sign(provider: "email", email: string): Promise<void>
    async function sign(provider: AllowedOauth): Promise<void>
    async function sign(provider: AllowedProviders, email?: string): Promise<void> {
        try {
            posthog.capture("sign_attempt", {
                email,
                provider,
            })
            splitbee.track(`${provider} sign attempt ${email ? `with email ${email}` : ""}`)
            const isEmail = provider === "email"
            setSignStatus("signing")
            const signInStatus = await signIn(provider, {
                callbackUrl: regUrl,
                redirect: !isEmail,
                email,
            })
            if (signInStatus?.error) {
                throw new Error(signInStatus?.error)
            }
            setSignStatus(isEmail ? "send" : "oauth")
        } catch (e) {
            posthog.capture("sign_failure", {
                email,
                provider,
                error: JSON.stringify(e),
            })
            splitbee.track("Sign error", { signError: JSON.stringify(e), email, provider })
            setSignStatus("error")
        }
    }

    useEffect(() => {
        if (status === "authenticated" && data?.user.email) {
            const { email, name, planId } = data.user
            splitbee.track("Sign success")
            splitbee.user.set({
                userId: email,
                name: name,
                planId: planId,
            })
            posthog.identify(email, { name, email })
            posthog.capture("sign_success", {
                email,
                name,
                planId,
            })
        }
        // If status changes, we are sure that user data exist, should prevent duplicate calls
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status])

    return [data?.user, { logout, sign, status: signStatus }] as const
}
