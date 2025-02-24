import { Genders } from "@prisma/client";

export class CreatePatientDto {
    firstName: string;
    firstSurname: string;
    secondSurname: string;
    dateOfBirth: Date;
    gender: Genders;
    phoneNumber: string;
    street: string;
    municipality: string;
    state: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    insuranceNumber: string;
}
