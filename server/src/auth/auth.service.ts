import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Roles } from '@prisma/client';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  async getGoogleAuthUrl(): Promise<string> {
    const { data, error } = await this.supabaseService.getClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3001/api/v1/auth/callback`,
      }
    })

    if (error) {
      throw new Error('No se pudo generar la URL de autenticación de Google');
    }

    if (!data.url) {
      throw new Error('No se pudo obtener la URL de autenticación de Google');
    }

    return data.url;
  } 

  async handleGoogleCallback(code: string) {
    try {
      const { data: { session }, error } = await this.supabaseService
        .getClient()
        .auth.exchangeCodeForSession(code);

      if (error) {
        console.log('Error en Supabase auth:', error);
        throw new Error(`Error durante el proceso de autenticación con Google: ${error.message}`);
      }

      if (!session || !session.user || !session.user.email) {
        console.log('Sesión inválida:', session);
        throw new Error('La sesión de usuario es inválida o no contiene email');
      }

      // Validar si el email está autorizado
      const userEmail = session.user.email;
      console.log('Verificando email autorizado:', userEmail);
      
      const authorizedEmail = await this.prismaService.authorizedEmails.findUnique({
        where: { email: userEmail }
      });

      if (!authorizedEmail) {
        throw new UnauthorizedException(`El correo ${userEmail} no está autorizado para acceder al sistema`);
      }

      let role = userEmail === process.env.NEFTALI_HERNANDEZ_MAIL ? Roles.SUPERADMIN : Roles.USER;

      // Crear o actualizar el usuario en la base de datos
      try {
        const user = await this.prismaService.user.upsert({
          where: { email: userEmail },
          update: {
            name: session.user.user_metadata?.full_name,
            avatar: session.user.user_metadata?.avatar_url,
            role: role,
          },
          create: {
            email: userEmail,
            name: session.user.user_metadata?.full_name,
            avatar: session.user.user_metadata?.avatar_url,
            role: role,
          },
        });

        if (!user) {
          throw new Error('No se pudo crear/actualizar el usuario');
        }
      } catch (dbError) {
        console.error('Error en base de datos:', dbError);
        throw new Error('Error al guardar la información del usuario');
      }

      return session.access_token;
    } catch (error) {
      console.error('Error detallado:', error);
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException(error.message || 'Error al procesar la autenticación');
    }
  }

  async logout(token: string) {
    await this.supabaseService.getClient().auth.admin.signOut(token);
  }

  async getUser(req: Request) {
    try {
      // Obtener el token de la cookie
      const token = req.cookies[process.env.SUPABASE_COOKIE_NAME];
      
      if (!token) {
        throw new UnauthorizedException('No token provided');
      }

      // Usar Supabase para obtener la sesión del usuario
      const { data: { user }, error } = await this.supabaseService
        .getClient()
        .auth.getUser(token);

      if (error || !user) {
        throw new UnauthorizedException('Invalid token');
      }

      // Buscar el usuario en la base de datos usando el email
      const dbUser = await this.prismaService.user.findUnique({
        where: {
          email: user.email,
        },
        select: {
          id: true,
          email: true,
          name: true,
          avatar: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!dbUser) {
        throw new UnauthorizedException('User not found in database');
      }

      return {
        status: 'success',
        data: dbUser,
      };
    } catch (error) {
      console.error('Error in getUser:', error);
      throw new UnauthorizedException(
        error instanceof UnauthorizedException 
          ? error.message 
          : 'Invalid token or user not found'
      );
    }
  }
}