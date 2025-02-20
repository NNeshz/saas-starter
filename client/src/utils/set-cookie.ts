'use server'

import { cookies } from 'next/headers'

type CookieOptions = {
    token: string;
    expiresAt: string | null;
    refreshToken: string | null;
}

export const setCookie = async({ token, expiresAt, refreshToken }: CookieOptions) => {
    const cookieStore = await cookies();
    const cookieName = process.env.JWT_COOKIE_NAME!;
    const secure = process.env.NODE_ENV === 'production';
    const maxAge = 30 * 24 * 60 * 60; // 30 días en segundos

    // Establecer la cookie del token JWT
    (await cookieStore).set({
        name: cookieName,
        value: token,
        httpOnly: true,
        secure,
        path: '/',
        sameSite: 'lax',
        maxAge,
    });

    // Establecer la cookie de expiración si existe
    if (expiresAt) {
        (await cookieStore).set({
            name: `${cookieName}-expiresAt`,
            value: expiresAt,
            httpOnly: true,
            secure,
            path: '/',
            sameSite: 'lax',
            maxAge,
        });
    }

    // Establecer la cookie de refresh token si existe
    if (refreshToken) {
        (await cookieStore).set({
            name: `${cookieName}-refreshToken`,
            value: refreshToken,
            httpOnly: true,
            secure,
            path: '/',
            sameSite: 'lax',
            maxAge,
        });
    }
}

export const deleteCookie = async () => {
    const cookieStore = await cookies();
    const cookieName = process.env.JWT_COOKIE_NAME!;

    (await cookieStore).delete(cookieName);
    (await cookieStore).delete(`${cookieName}-expiresAt`);
    (await cookieStore).delete(`${cookieName}-refreshToken`);
}

export const getCookie = async () => {
    const cookieStore = await cookies();
    const cookieName = process.env.JWT_COOKIE_NAME!;
    return cookieStore.get(cookieName)?.value;
}

