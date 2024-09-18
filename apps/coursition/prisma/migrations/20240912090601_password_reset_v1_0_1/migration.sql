/*
  Warnings:

  - You are about to drop the column `user_id` on the `PasswordReset` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasswordReset" DROP CONSTRAINT "PasswordReset_user_id_fkey";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "user_id";
