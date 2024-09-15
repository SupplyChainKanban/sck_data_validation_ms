/*
  Warnings:

  - Added the required column `priority` to the `ValidationResult` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RawDataPriority" AS ENUM ('HIGH', 'MEDIUM', 'LOW');

-- AlterTable
ALTER TABLE "ValidationResult" ADD COLUMN     "priority" "RawDataPriority" NOT NULL;
