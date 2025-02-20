'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AuthCallback() {
    const router = useRouter()

    useEffect(() => {
        const handleCallback = async () => {
            try {
                // Obtener el hash de la URL (sin el #)
                const hash = window.location.hash.substring(1)

                // Convertir el hash en un objeto de parámetros
                const params = new URLSearchParams(hash)

                const accessToken = params.get('access_token')
                const expiresAt = params.get('expires_at')
                const refreshToken = params.get('refresh_token')

                if (!accessToken) {
                    throw new Error('No access token provided')
                }

                // Establecer las cookies usando la utilidad del servidor
                await fetch('/api/auth/set-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token: accessToken,
                        expiresAt: expiresAt || null,
                        refreshToken: refreshToken || null
                    })
                })

                // Redirigir al dashboard después de un login exitoso
                router.push('/')
            } catch (error: any) {
                console.error('Error durante el callback:', error)
                router.push(`/login?error=${encodeURIComponent(error.message || 'auth_failed')}`)
            }
        }

        handleCallback()
    }, [router])

    return (
        <div className="flex items-center justify-center h-screen">
            <p>Procesando autenticación...</p>
        </div>
    )
} 