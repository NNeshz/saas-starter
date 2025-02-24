/*
  Warnings:

  - You are about to drop the column `firstName` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `firstSurname` on the `Patient` table. All the data in the column will be lost.
  - You are about to drop the column `secondSurname` on the `Patient` table. All the data in the column will be lost.
  - Added the required column `civilStatus` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationship` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Relationships" AS ENUM ('PARENT', 'SIBLING', 'FRIEND', 'FAMILY', 'OTHER');

-- CreateEnum
CREATE TYPE "CivilStatus" AS ENUM ('SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWER');

-- AlterTable
ALTER TABLE "Patient" DROP COLUMN "firstName",
DROP COLUMN "firstSurname",
DROP COLUMN "secondSurname",
ADD COLUMN     "civilStatus" "CivilStatus" NOT NULL,
ADD COLUMN     "colony" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "relationship" "Relationships" NOT NULL;
