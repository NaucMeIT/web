import { useCallback, useEffect, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

export const useRecaptcha = () => {
    const [token, setToken] = useState("")

    const { executeRecaptcha } = useGoogleReCaptcha()

    const handleReCaptchaVerify = useCallback(async () => {
        if (!executeRecaptcha) {
            console.log("Execute recaptcha not yet available")
            return
        }

        const token = await executeRecaptcha("submit")
        setToken(token)
    }, [executeRecaptcha])

    useEffect(() => {
        handleReCaptchaVerify()
    }, [handleReCaptchaVerify])

    return token
}
