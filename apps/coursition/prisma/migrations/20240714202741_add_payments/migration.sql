-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('FREE', 'LIFETIME');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "paymentStatus" "PaymentStatus" NOT NULL DEFAULT 'FREE';
