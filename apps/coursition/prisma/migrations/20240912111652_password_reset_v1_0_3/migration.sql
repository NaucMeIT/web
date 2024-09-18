/*
  Warnings:

  - The primary key for the `PasswordReset` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[secret]` on the table `PasswordReset` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "PasswordReset" DROP CONSTRAINT "PasswordReset_pkey",
ALTER COLUMN "is_used" SET DEFAULT false,
ADD CONSTRAINT "PasswordReset_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_secret_key" ON "PasswordReset"("secret");
