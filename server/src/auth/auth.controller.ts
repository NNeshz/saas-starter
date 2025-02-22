import { Controller, Get, Req, Res } from '@nestjs/common';
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
      res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
      return;
    }

    try {
      const token = await this.authService.handleGoogleCallback(code);
      res.cookie('sb-access-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });
      console.log({ token });
      res.redirect(303, `${process.env.FRONTEND_URL}/auth/callback`);
    } catch (error) {
      console.error('Error en callback:', error);
      res.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }
  }
}