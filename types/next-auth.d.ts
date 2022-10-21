import NextAuth from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        readonly user: {
            readonly planId: string | null
            readonly email: string | null
            readonly name: string | null
        }
    }
    interface User {
        readonly planId: string
    }
}
