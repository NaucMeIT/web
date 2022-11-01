import { PrismaAdapter } from "@next-auth/prisma-adapter"
import NextAuth, { User, Session } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import EmailProvider from "next-auth/providers/email"
import { prisma } from "../../../utils/prisma"

export const authOptions = {
    providers: [
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: parseInt(process.env.EMAIL_SERVER_PORT || ""),
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            maxAge: 10 * 60,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || "",
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID || "",
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
        }),
    ],
    adapter: PrismaAdapter(prisma),
    callbacks: {
        async session({ session, user }: { readonly session: Session; readonly user: User }) {
            const { planId, paymentStatus } = user
            const enhancedSession = {
                ...session,
                user: {
                    ...session.user,
                    planId,
                    paymentStatus,
                },
            }

            return enhancedSession
        },
    },
    pages: {
        signIn: "/sign",
        signOut: "/",
        error: "/sign", // Error code passed in query string as ?error=
        verifyRequest: "/sign", // (used for check email message)
    },
}

export default NextAuth(authOptions)
