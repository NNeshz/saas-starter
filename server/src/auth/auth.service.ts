import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaService } from 'src/prisma/prisma.service';

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

      // Crear o actualizar el usuario en la base de datos
      try {
        const user = await this.prismaService.user.upsert({
          where: { email: userEmail },
          update: {
            name: session.user.user_metadata?.full_name,
            avatar: session.user.user_metadata?.avatar_url,
          },
          create: {
            email: userEmail,
            name: session.user.user_metadata?.full_name,
            avatar: session.user.user_metadata?.avatar_url,
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
}