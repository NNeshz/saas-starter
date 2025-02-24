import { CivilStatus, Genders, Relationships } from "@prisma/client";

export class CreatePatientDto {
    fullName: string;
    email?: string;
    dateOfBirth: Date;
    gender: Genders;
    civilStatus: CivilStatus;
    phoneNumber: string;
    street: string;
    colony?: string;
    municipality: string;
    state: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    relationship: Relationships;
    insuranceNumber: string;
}
