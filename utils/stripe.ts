import { PaymentStatus } from "@prisma/client"

export const allowedStatus: readonly PaymentStatus[] = [
    PaymentStatus.Done,
    PaymentStatus.NotNecessary,
    PaymentStatus.InProgress,
]
