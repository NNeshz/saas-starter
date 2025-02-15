import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

  async signInWithGoogle() {
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
  }

  async handleCallback(req: any) {
    const { data: { session }, error } = await this.supabaseService
      .getClient()
      .auth.setSession(req.session);

    if (error) throw new UnauthorizedException(error.message);
    
    const user = await this.prisma.user.upsert({
      where: { email: session.user.email },
      create: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.user_metadata?.full_name,
        avatar: session.user.user_metadata?.avatar_url
      },
      update: {
        name: session.user.user_metadata?.full_name,
        avatar: session.user.user_metadata?.avatar_url
      }
    });

    return { user, session };
  }

  async signOut() {
    const { error } = await this.supabaseService
      .getClient()
      .auth.signOut();

    if (error) throw new UnauthorizedException(error.message);
    return { message: 'Logged out successfully' };
  }
}