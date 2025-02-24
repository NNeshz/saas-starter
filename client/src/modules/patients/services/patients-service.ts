import { BaseApiResponse } from "@/modules/common/types/api-response.types"
import { CreatePatientDto } from "../interfaces/create-patient"
import { patientInstance } from "./patient-instance"
import { PatientResponse } from "../interfaces/patient-response"

export const PatientsService = {
    async create(data: CreatePatientDto): Promise<BaseApiResponse<PatientResponse>> {
        try {
            const resonse = await patientInstance.post<BaseApiResponse<PatientResponse>>('/', data)
            return resonse.data
        } catch (error) {
            throw error
        }
    },

    async findAll(): Promise<BaseApiResponse<PatientResponse>> {
        try {
            const resonse = await patientInstance.get<BaseApiResponse<PatientResponse>>('/')
            return resonse.data
        } catch (error) {
            throw error
        }
    },

}
