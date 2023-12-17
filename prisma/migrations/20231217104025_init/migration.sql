-- CreateTable
CREATE TABLE `Users` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `Username` VARCHAR(191) NOT NULL,
    `HashedPassword` VARCHAR(191) NOT NULL,
    `Email` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activities` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `ActivityName` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActivityParameters` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `ActivityID` INTEGER NOT NULL,
    `Ratio` FLOAT NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TimeLogs` (
    `ID` INTEGER NOT NULL AUTO_INCREMENT,
    `UserID` INTEGER NOT NULL,
    `ActivityID` INTEGER NOT NULL,
    `Time` INTEGER NOT NULL,

    PRIMARY KEY (`ID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActivityParameters` ADD CONSTRAINT `ActivityParameters_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ActivityParameters` ADD CONSTRAINT `ActivityParameters_ActivityID_fkey` FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeLogs` ADD CONSTRAINT `TimeLogs_UserID_fkey` FOREIGN KEY (`UserID`) REFERENCES `Users`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TimeLogs` ADD CONSTRAINT `TimeLogs_ActivityID_fkey` FOREIGN KEY (`ActivityID`) REFERENCES `Activities`(`ID`) ON DELETE RESTRICT ON UPDATE CASCADE;
