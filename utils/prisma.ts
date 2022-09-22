import { PrismaClient } from "@prisma/client"

declare global {
    var prisma: PrismaClient // This must be a `var` and not a `let / const`
}

export const prisma = global.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") {
    global.prisma = prisma
}
