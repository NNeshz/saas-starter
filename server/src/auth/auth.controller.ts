import { Controller, Get, Req, Res, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Get('signin')
  async signin(@Res() res: Response) {
    const url = await this.authService.getGoogleAuthUrl();
    res.redirect(url);
  }

  @Get('callback')
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const code = req.query.code as string;
    const next = req.query.next ?? '/';

    if (!code) {
      console.log('No se recibió código de autorización');
      res.redirect(`${process.env.FRONTEND_URL}/`);
      return;
    }

    try {
      const token = await this.authService.handleGoogleCallback(code);
      res.cookie(process.env.SUPABASE_COOKIE_NAME, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });
      res.redirect(`${process.env.FRONTEND_URL}${next}`);
    } catch (error) {
      console.error('Error en callback:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(error.message)}`);
    }
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUser(@Req() req: Request) {
    return this.authService.getUser(req);
  }
}