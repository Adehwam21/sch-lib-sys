/*
  Warnings:

  - A unique constraint covering the columns `[ISBN]` on the table `BookCopy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookCopy_ISBN_key" ON "BookCopy"("ISBN");
