import { getHeaders } from "@/lib/utils/get-headers";
import { authInstance } from "./auth-instance";
import { UserResponse } from "../interfaces/auth-interface";
import { User } from "../interfaces/auth-interface";


export const AuthService = {
    async login() {
        const response = await authInstance.get('/signin');
        return response.data;
    },

    async logout() {
        const response = await authInstance.get('/logout');
        return response.data;
    },

    async getUser(): Promise<User> {
        try {
            const response = await authInstance.get<UserResponse>('/user', {
                withCredentials: true,
                headers: getHeaders(),
            });
            const user = response.data;

            return {
                id: user.data.id,
                email: user.data.email,
                name: user.data.name,
                avatar: user.data.avatar,
                adminRole: user.data.adminRole,
                userRole: user.data.userRole,
            };
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}