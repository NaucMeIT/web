import type { NextPage } from "next"
import { SignedIn, SignedOut, RedirectToSignIn, ClerkProvider } from "@clerk/nextjs"

const Login: NextPage = () => {
    return (
        <ClerkProvider>
            <SignedIn>Test</SignedIn>
            <SignedOut>
                <RedirectToSignIn />
            </SignedOut>
        </ClerkProvider>
    )
}

export default Login
