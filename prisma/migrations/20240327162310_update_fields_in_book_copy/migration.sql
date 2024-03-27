/*
  Warnings:

  - The primary key for the `BookCopy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `copyId` on the `BookCopy` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "BookCopy_copyId_key";

-- AlterTable
CREATE SEQUENCE bookcopy_copycode_seq;
ALTER TABLE "BookCopy" DROP CONSTRAINT "BookCopy_pkey",
DROP COLUMN "copyId",
ALTER COLUMN "copyCode" SET DEFAULT nextval('bookcopy_copycode_seq'),
ADD CONSTRAINT "BookCopy_pkey" PRIMARY KEY ("copyCode");
ALTER SEQUENCE bookcopy_copycode_seq OWNED BY "BookCopy"."copyCode";
