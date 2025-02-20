import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import * as jose from 'jose';

const SUPABASE_JWT_SECRET = process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!;
const TOKEN_NAME = process.env.NEXT_PUBLIC_APP_JWT_TOKEN_NAME!;

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
    const secret = new TextEncoder().encode(SUPABASE_JWT_SECRET);
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

  // Si hay un token, verifica su validez
  const decodedToken = token ? await verifyTokenExpired(token) : null;

  // Si hay un token válido y el usuario intenta acceder a /login
  if (decodedToken && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Para todas las demás rutas, permite el acceso
  return NextResponse.next();
}

export const config = {
    matcher: ["/", "/login"],
};