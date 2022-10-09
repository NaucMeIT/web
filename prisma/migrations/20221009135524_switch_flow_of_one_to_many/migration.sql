-- DropForeignKey
ALTER TABLE "Plan" DROP CONSTRAINT "Plan_id_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "planId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_planId_fkey" FOREIGN KEY ("planId") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
