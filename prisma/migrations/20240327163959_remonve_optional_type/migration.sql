/*
  Warnings:

  - Made the column `ISBN` on table `BookCopy` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BookCopy" ALTER COLUMN "ISBN" SET NOT NULL;
