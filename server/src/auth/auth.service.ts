import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
  ) {}

  async getGoogleAuthUrl(): Promise<string> {
    const { data, error } = await this.supabaseService.getClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `http://localhost:3001/api/v1/auth/callback`,
      }
    })

    if (error) {
      console.error('Error al obtener la URL de autenticación de Google:', error);
      throw new Error('Error al obtener la URL de autenticación de Google');
    }

    if (data.url) {
      console.log('URL de autenticación de Google:', data.url);
      return data.url;
    }

    throw new Error('Error al obtener la URL de autenticación de Google');
  } 

  async handleGoogleCallback(code: string) {
    try {
      console.log({ code });
      
      const { data: { session }, error } = await this.supabaseService
        .getClient()
        .auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Error en exchangeCodeForSession:', error);
        throw error;
      }

      console.log('Sesión obtenida:', session);
      return session.access_token;
    } catch (error) {
      console.error('Error en handleGoogleCallback:', error);
      throw new UnauthorizedException('Error al procesar la autenticación');
    }
  }

  async logout(token: string) {
    await this.supabaseService.getClient().auth.admin.signOut(token);
  }
}