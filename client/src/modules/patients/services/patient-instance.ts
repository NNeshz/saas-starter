import axios from "axios";
import { getHeaders } from "@/lib/utils/get-headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
const patientsPrefix = process.env.NEXT_PUBLIC_PATIENTS_PREFIX;


export const patientInstance = axios.create({
    baseURL: `${baseUrl}/${patientsPrefix}`,
    headers: {
        'Content-Type': 'application/json',
        ...getHeaders(),
    },
    withCredentials: true,
})
