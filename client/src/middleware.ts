import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as jose from 'jose';

const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET as string;
const TOKEN_NAME = process.env.NEXT_PUBLIC_AUTH_COOKIE_NAME as string;

interface DecodedToken {
  sub: string;
  email: string;
  name: string;
  avatar: string;
  role: string;
  exp: number;
}

async function verifyTokenExpired(token: string) {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const decodedToken = await jose.jwtVerify(token, secret) as {
      payload: DecodedToken;
    };

    return decodedToken.payload;
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(TOKEN_NAME)?.value;
  const { pathname } = request.nextUrl;

  // Verifica el token si existe
  const decodedToken = token ? await verifyTokenExpired(token) : null;

  // Si hay un token válido y el usuario intenta acceder a /login
  if (decodedToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si no hay un token válido y el usuario intenta acceder a cualquier ruta de dashboard
  if (!decodedToken && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Para todas las demás rutas, permite el acceso
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};