import { Controller, Get, Req, Res, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) { }

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
      const { accessToken, refreshToken } = await this.authService.handleGoogleCallback(code);

      res.cookie(process.env.AUTH_COOKIE_NAME, accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });

      res.cookie(process.env.AUTH_REFRESH_COOKIE_NAME, refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
      });

      res.redirect(`${process.env.FRONTEND_URL}`);
    } catch (error) {
      console.error('Error en callback:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=${encodeURIComponent(error.message)}`);
    }
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies[process.env.AUTH_REFRESH_COOKIE_NAME];

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    const tokens = await this.authService.refreshToken(refreshToken);

    // Set new token as cookies
    res.cookie(process.env.AUTH_COOKIE_NAME, tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    res.cookie(process.env.AUTH_REFRESH_COOKIE_NAME, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
    });

    res.status(HttpStatus.OK).json({ message: 'Tokens refreshed successfully' });
  }

  @Get('user')
  @HttpCode(HttpStatus.OK)
  async getUser(@Req() req: Request) {
    return this.authService.getUser(req);
  }
}