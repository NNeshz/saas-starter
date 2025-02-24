import { getHeaders } from "@/lib/utils/get-headers";
import { authInstance } from "./auth-instance";
import { User } from "../interfaces/auth-interface";
import { BaseApiResponse } from "@/modules/common/types/api-response.types";


export const AuthService = {
    async login() {
        const response = await authInstance.get('/signin');
        return response.data;
    },

    async logout() {
        const response = await authInstance.get('/logout');
        return response.data;
    },

    async getUser(): Promise<BaseApiResponse<User>> {
        try {
            const response = await authInstance.get<BaseApiResponse<User>>('/user', {
                withCredentials: true,
                headers: getHeaders(),
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}