/*
  Warnings:

  - A unique constraint covering the columns `[ISBN]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "BookCopy" DROP CONSTRAINT "BookCopy_bookId_fkey";

-- CreateIndex
CREATE UNIQUE INDEX "Book_ISBN_key" ON "Book"("ISBN");

-- AddForeignKey
ALTER TABLE "BookCopy" ADD CONSTRAINT "BookCopy_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
