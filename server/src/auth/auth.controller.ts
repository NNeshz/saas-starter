import { Controller, Get, Req, Res, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

  @Get('signin')
  async signIn(@Res() res: Response) {
    const { url } = await this.authService.signInWithGoogle();
    return res.redirect(url);
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.handleCallback(req);
      // Redirigir al frontend con un token de éxito
      return res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${result.session.access_token}`);  
    } catch (error) {
      // Redirigir al frontend con un mensaje de error
      return res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent(error.message)}`);
    }
  }

  @Get('signout')
  async signOut(@Res() res: Response) {
    const result = await this.authService.signOut();
    return res.json(result);
  }

  @Get('session')
  async getSession(@Req() req: Request) {
    const { data: { session }, error } = await this.supabaseService
      .getClient()
      .auth.getSession();
    
    if (error || !session) {
      throw new UnauthorizedException('No active session');
    }

    // Verificar que el usuario está autorizado
    const authorizedUser = await this.prisma.authorizedUser.findUnique({
      where: { email: session.user.email }
    });

    if (!authorizedUser) {
      throw new UnauthorizedException('No estas autorizado para acceder a esta aplicación');
    }
    const user = await this.prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    return { user };
  }
}
