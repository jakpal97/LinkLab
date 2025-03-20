/*
  Warnings:

  - A unique constraint covering the columns `[customSlug]` on the table `Url` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[customDomain]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Url" ADD COLUMN     "customDomain" TEXT,
ADD COLUMN     "customSlug" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "customDomain" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Url_customSlug_key" ON "Url"("customSlug");

-- CreateIndex
CREATE UNIQUE INDEX "User_customDomain_key" ON "User"("customDomain");
