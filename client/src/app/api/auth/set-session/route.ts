import { NextResponse } from 'next/server'
import { setCookie } from '@/utils/set-cookie'

export async function POST(request: Request) {
    try {
        const body = await request.json()
        const { token, expiresAt, refreshToken } = body

        if (!token) {
            return NextResponse.json(
                { error: 'No token provided' },
                { status: 400 }
            )
        }

        // Establecer las cookies
        await setCookie({
            token,
            expiresAt,
            refreshToken
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Error setting session:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
} 