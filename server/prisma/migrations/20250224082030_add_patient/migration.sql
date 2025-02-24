/*
  Warnings:

  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "AdminRoles" AS ENUM ('SUPERADMIN', 'ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "UserRoles" AS ENUM ('DOCTOR', 'NUTRITIONIST', 'PHYSIOTHERAPIST', 'DENTIST');

-- CreateEnum
CREATE TYPE "Genders" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "adminRole" "AdminRoles" NOT NULL DEFAULT 'USER',
ADD COLUMN     "userRole" "UserRoles" NOT NULL DEFAULT 'DOCTOR';

-- DropEnum
DROP TYPE "Roles";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "firstSurname" TEXT NOT NULL,
    "secondSurname" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "gender" "Genders" NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "municipality" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactPhone" TEXT NOT NULL,
    "insuranceNumber" TEXT NOT NULL,
    "registrationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicalHistory" (
    "id" TEXT NOT NULL,
    "chronicDiseases" TEXT,
    "allergies" TEXT,
    "surgeries" TEXT,
    "smoker" BOOLEAN NOT NULL,
    "alcohol" BOOLEAN NOT NULL,
    "drugs" BOOLEAN NOT NULL,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "MedicalHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Medication" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "dosage" TEXT NOT NULL,
    "frequency" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Medication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" TEXT,
    "notes" TEXT,
    "patientId" TEXT NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "MedicalHistory_patientId_idx" ON "MedicalHistory"("patientId");

-- CreateIndex
CREATE INDEX "Medication_patientId_idx" ON "Medication"("patientId");

-- CreateIndex
CREATE INDEX "Appointment_patientId_idx" ON "Appointment"("patientId");

-- AddForeignKey
ALTER TABLE "MedicalHistory" ADD CONSTRAINT "MedicalHistory_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Medication" ADD CONSTRAINT "Medication_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
