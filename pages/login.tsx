import type { NextPage } from "next"
import { SignedIn, SignedOut, RedirectToSignIn, ClerkProvider, SignIn } from "@clerk/nextjs"

const Login: NextPage = () => {
    return (
        <ClerkProvider>
            <SignIn />
        </ClerkProvider>
    )
}

export default Login
