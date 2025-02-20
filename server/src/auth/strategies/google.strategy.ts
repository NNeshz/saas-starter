import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { SupabaseService } from '../../supabase/supabase.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly supabaseService: SupabaseService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { id, displayName, emails, photos } = profile;
    
    // Verifica si el usuario ya existe en Supabase
    const { data: user, error } = await this.supabaseService
      .getClient()
      .from('auth.users')
      .select('*')
      .eq('email', emails[0].value)
      .single();

    if (error) {
      return done(error, false);
    }

    // Si el usuario no existe, lo registramos en Supabase
    if (!user) {
      const { data: newUser, error: createError } = await this.supabaseService
        .getClient()
        .auth.signUp({
          email: emails[0].value,
          password: id, // No es ideal, pero Supabase requiere una contraseña
          options: {
            data: {
              name: displayName,
              avatar: photos[0].value,
            },
          },
        });

      if (createError) {
        return done(createError, false);
      }

      return done(null, newUser);
    }

    return done(null, user);
  }
}
