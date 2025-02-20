import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

  async signInWithGoogle() {
    try {
      const { data, error } = await this.supabaseService
      .getClient()
      .auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.SUPABASE_URL}/auth/v1/callback`
        }
      });

      if (error) throw new UnauthorizedException(error.message);
      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message); 
    }
  }

  async handleCallback(req: any) {
    try {
      const { data: { session }, error } = await this.supabaseService
      .getClient()
      .auth.setSession(req.session);

    if (error) throw new UnauthorizedException(error.message);
    
    // Vrificar si el email del usuario esta en la tabla AuthorizedUser
    const authorizedUser = await this.prisma.authorizedUser.findUnique({
      where: { email: session.user.email }
    });

    if (!authorizedUser) {
      throw new UnauthorizedException('User not authorized');
    }

    // Asignar el rol basado en cual es el email del usuario
    const role = authorizedUser.email === process.env.NEFTALI_HERNANDEZ_MAIL ? Role.SUPERADMIN : Role.STAFF;

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

      return { user, session };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async signOut() {
    const { error } = await this.supabaseService
      .getClient()
      .auth.signOut();

    if (error) throw new UnauthorizedException(error.message);
    return { message: 'Logged out successfully' };
  }
}