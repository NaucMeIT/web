import type { NextPage } from "next"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs"

const Login: NextPage = () => {
    return (
        <>
            <SignedIn>Test</SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </>
    )
}

export default Login
