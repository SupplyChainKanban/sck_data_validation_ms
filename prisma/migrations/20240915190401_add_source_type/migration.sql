/*
  Warnings:

  - Added the required column `sourceId` to the `ValidationLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ValidationLog" ADD COLUMN     "sourceId" TEXT NOT NULL;
