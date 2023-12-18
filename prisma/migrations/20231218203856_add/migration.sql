/*
  Warnings:

  - A unique constraint covering the columns `[ActivityName]` on the table `Activities` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `isLeisure` to the `TimeLogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TimeLogs` ADD COLUMN `isLeisure` BOOLEAN NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Activities_ActivityName_key` ON `Activities`(`ActivityName`);
