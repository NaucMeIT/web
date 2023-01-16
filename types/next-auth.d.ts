import NextAuth from "next-auth"
import { PaymentStatus } from "@prisma/client"

declare module "next-auth" {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		readonly user: {
			readonly planId: string | null
			readonly email: string | null
			readonly name: string | null
			readonly paymentStatus: PaymentStatus
			readonly credits: number
		}
	}
	interface User {
		readonly planId: string
		readonly paymentStatus: PaymentStatus
		readonly credits: number
	}
}
