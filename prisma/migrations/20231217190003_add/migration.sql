/*
  Warnings:

  - Added the required column `RatioAtTheTime` to the `TimeLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TimeLogs` ADD COLUMN `RatioAtTheTime` INTEGER NOT NULL;
