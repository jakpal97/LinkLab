-- CreateTable
CREATE TABLE "Click" (
    "id" TEXT NOT NULL,
    "urlId" TEXT NOT NULL,
    "country" TEXT,
    "referrer" TEXT,
    "userAgent" TEXT,
    "ipAddress" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Click_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Click" ADD CONSTRAINT "Click_urlId_fkey" FOREIGN KEY ("urlId") REFERENCES "Url"("id") ON DELETE CASCADE ON UPDATE CASCADE;
