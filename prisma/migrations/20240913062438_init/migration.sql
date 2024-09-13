-- CreateEnum
CREATE TYPE "Rules" AS ENUM ('required', 'numeric', 'number', 'alphanumeric', 'date_format', 'optional', 'enum', 'string');

-- CreateEnum
CREATE TYPE "ValidationStatus" AS ENUM ('VALID', 'INVALID');

-- CreateTable
CREATE TABLE "ValidationRule" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "keyName" TEXT NOT NULL,
    "rule" "Rules" NOT NULL,
    "regexPattern" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidationRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationLog" (
    "id" TEXT NOT NULL,
    "rawDataId" TEXT NOT NULL,
    "errors" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ValidationLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidationResult" (
    "id" TEXT NOT NULL,
    "sourceId" TEXT NOT NULL,
    "validatedData" JSONB NOT NULL,
    "status" "ValidationStatus" NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ValidationResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ValidationRule_sourceId_keyName_rule_key" ON "ValidationRule"("sourceId", "keyName", "rule");
