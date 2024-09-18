/*
  Warnings:

  - Added the required column `email` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PasswordReset" ADD COLUMN     "email" TEXT NOT NULL;
