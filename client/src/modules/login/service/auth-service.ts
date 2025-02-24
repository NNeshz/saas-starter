import { getHeaders } from "@/lib/utils/get-headers";
import { authInstance } from "./auth-instance";

interface User {
    id: string;
    email: string;
    name: string;
    avatar: string;
    role: 'SUPERADMIN' | 'ADMIN' | 'USER';
}

interface UserResponse {
    success: string;
    data: User;
}

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
                role: user.data.role,
            };
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
}