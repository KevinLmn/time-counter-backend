/*
  Warnings:

  - You are about to drop the column `Ratio` on the `ActivityParameters` table. All the data in the column will be lost.
  - You are about to drop the column `Username` on the `Users` table. All the data in the column will be lost.
  - Added the required column `CustomParam1` to the `ActivityParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `FirstName` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActivityParameters` DROP COLUMN `Ratio`,
    ADD COLUMN `CustomParam1` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `Username`,
    ADD COLUMN `FirstName` VARCHAR(191) NOT NULL,
    ADD COLUMN `LastName` VARCHAR(191) NOT NULL;
