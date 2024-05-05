-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('NotNecessary', 'Awaiting', 'InProgress', 'Done', 'Failed');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'NotNecessary';
