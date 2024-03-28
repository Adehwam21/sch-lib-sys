/*
  Warnings:

  - A unique constraint covering the columns `[copyCode]` on the table `BookCopy` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "BookCopy_ISBN_key";

-- CreateIndex
CREATE UNIQUE INDEX "BookCopy_copyCode_key" ON "BookCopy"("copyCode");
