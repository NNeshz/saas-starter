'use client'

import { useQuery } from "@tanstack/react-query";
import { AuthService } from "../service/auth-service";

export const useUsers = () => {
    return useQuery({
        queryKey: ['users'],
        queryFn: () => AuthService.getUser(),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });
};
