import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async signInWithGoogle() {
    try {
      // Iniciar sesión con Google a través de Supabase
      const { data, error } = await this.supabaseService
        .getClient()
        .auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: `${process.env.FRONTEND_URL}/auth/callback`
          }
        });

      if (error) throw new UnauthorizedException(error.message);
      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message); 
    }
  }

  async handleCallback(code: string) {
    try {
      // Intercambiar el código por una sesión en Supabase
      const { data: { session }, error } = await this.supabaseService
        .getClient()
        .auth.exchangeCodeForSession(code);

      if (error) throw new UnauthorizedException(error.message);
      if (!session) throw new UnauthorizedException('No session created');
      
      // Verificar si el usuario está autorizado en la base de datos
      const authorizedUser = await this.prisma.authorizedUser.findUnique({
        where: { email: session.user.email }
      });
      if (!authorizedUser) {
        throw new UnauthorizedException('Usuario no autorizado');
      }

      // Determinar el rol del usuario
      const role = authorizedUser.email === process.env.NEFTALI_HERNANDEZ_MAIL 
        ? Role.SUPERADMIN 
        : Role.STAFF;

      // Crear o actualizar el usuario en la base de datos
      const user = await this.prisma.user.upsert({
        where: { email: session.user.email },
        create: {
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.full_name,
          avatar: session.user.user_metadata?.avatar_url,
          role
        },
        update: {
          name: session.user.user_metadata?.full_name,
          avatar: session.user.user_metadata?.avatar_url,
          role
        }
      });

      const payload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
        role: user.role
      }
      const accessToken = this.jwtService.sign(payload);

      return { user, session: { ...session, access_token: accessToken } };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async signOut() {
    try {
      // Cerrar sesión en Supabase
      const { error } = await this.supabaseService
        .getClient()
        .auth.signOut();

      if (error) throw new UnauthorizedException(error.message);
      return { message: 'Sesión cerrada exitosamente' };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }
}
