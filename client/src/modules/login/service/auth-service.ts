import { api } from "@/lib/axios/instance"

export const AuthService = {
    async login() {
        // Redirigir al usuario a la URL de autenticación
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`
    },

    async getSession() {
        try {
            const response = await api.get('/auth/signin')
            return response.data
        } catch (error) {
            console.error('Error al obtener la sesión:', error)
            throw error
        }
    }
}
