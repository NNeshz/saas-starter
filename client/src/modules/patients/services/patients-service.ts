import { BaseApiResponse, PaginatedApiResponse } from "@/modules/common/types/api-response.types"
import { CreatePatientDto } from "../interfaces/create-patient"
import { patientInstance } from "./patient-instance"
import { PatientCreateResponse, PatientsResponse } from "../interfaces/patient-response"
import { FilterPatientDto } from "../interfaces/filter-patient"

export const PatientsService = {
    async create(data: CreatePatientDto): Promise<BaseApiResponse<PatientCreateResponse>> {
        try {
            const resonse = await patientInstance.post<BaseApiResponse<PatientCreateResponse>>('/', data)
            return resonse.data
        } catch (error) {
            throw error
        }
    },

    async findAll(params: FilterPatientDto): Promise<PaginatedApiResponse<PatientsResponse>> {
        try {
            const resonse = await patientInstance.get<PaginatedApiResponse<PatientsResponse>>('/', { params })
            return resonse.data
        } catch (error) {
            throw error
        }
    },

}
