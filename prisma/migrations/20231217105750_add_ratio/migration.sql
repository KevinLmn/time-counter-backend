/*
  Warnings:

  - You are about to drop the column `CustomParam1` on the `ActivityParameters` table. All the data in the column will be lost.
  - You are about to drop the column `FirstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `LastName` on the `Users` table. All the data in the column will be lost.
  - Added the required column `Ratio` to the `ActivityParameters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `ActivityParameters` DROP COLUMN `CustomParam1`,
    ADD COLUMN `Ratio` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `FirstName`,
    DROP COLUMN `LastName`,
    ADD COLUMN `Username` VARCHAR(191) NOT NULL;
