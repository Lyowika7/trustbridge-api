-- AlterTable
ALTER TABLE "ApiKey" ADD COLUMN     "lastUsedAt" TIMESTAMP(3),
ADD COLUMN     "requestsCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "ApiUsageLog" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "statusCode" INTEGER NOT NULL,
    "ipAddress" TEXT,
    "apiKeyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApiUsageLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApiUsageLog" ADD CONSTRAINT "ApiUsageLog_apiKeyId_fkey" FOREIGN KEY ("apiKeyId") REFERENCES "ApiKey"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
