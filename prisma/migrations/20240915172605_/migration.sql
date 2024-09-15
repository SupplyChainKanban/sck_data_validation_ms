/*
  Warnings:

  - The values [VALID,INVALID] on the enum `ValidationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `sourceId` on the `ValidationResult` table. All the data in the column will be lost.
  - Added the required column `rawDataId` to the `ValidationResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ValidationStatus_new" AS ENUM ('PENDING', 'PROCESSED', 'NOT_PROCESSED');
ALTER TABLE "ValidationResult" ALTER COLUMN "status" TYPE "ValidationStatus_new" USING ("status"::text::"ValidationStatus_new");
ALTER TYPE "ValidationStatus" RENAME TO "ValidationStatus_old";
ALTER TYPE "ValidationStatus_new" RENAME TO "ValidationStatus";
DROP TYPE "ValidationStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "ValidationResult" DROP COLUMN "sourceId",
ADD COLUMN     "rawDataId" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
