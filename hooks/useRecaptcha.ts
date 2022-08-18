import { useCallback, useState } from "react"
import { useReCaptcha } from "next-recaptcha-v3"

export const useRecaptcha = (): readonly [string, () => Promise<void>] => {
    const [token, setToken] = useState("")

    const { executeRecaptcha } = useReCaptcha()

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available")
            return
        }

        if (!token) {
            const token = await executeRecaptcha("submit")
            setToken(token)
        }
    }, [executeRecaptcha, token])

    return [token, handleReCaptchaVerify]
}
