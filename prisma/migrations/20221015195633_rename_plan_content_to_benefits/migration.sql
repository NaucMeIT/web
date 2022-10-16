/*
  Warnings:

  - You are about to drop the column `content` on the `Plan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Plan" DROP COLUMN "content",
ADD COLUMN     "benefits" TEXT[];
