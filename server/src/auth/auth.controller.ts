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
    const result = await this.authService.handleCallback(req);
    // Aquí deberías redirigir al frontend con los tokens
    return res.json(result);
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
    
    const user = await this.prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    return { user };
  }
}
