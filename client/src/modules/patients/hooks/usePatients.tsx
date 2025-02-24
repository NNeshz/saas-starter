'use client'

import { useQuery } from "@tanstack/react-query";
import { PatientsService } from "../services/patients-service";

export const usePatients = () => {
    return useQuery({
        queryKey: ['patients'],
        queryFn: () => PatientsService.findAll(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}