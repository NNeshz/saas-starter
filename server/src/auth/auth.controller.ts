import { Controller, Get, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { SupabaseService } from '../supabase/supabase.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface Request extends ExpressRequest {
  user?: any;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService
  ) {}

  @Get('signin')
  async signIn(@Res() res: Response) {
    try {
      // Obtener la URL de autenticación con Google desde Supabase
      const { url } = await this.authService.signInWithGoogle();
      // Redirigir al usuario a la URL de autenticación
      return res.redirect(url);
    } catch (error) {
      return res.status(500).json({ message: 'Error al generar la URL de autenticación' });
    }
  }

  @Get('callback')
  async callback(@Req() req: Request, @Res() res: Response) {
    try {
      const code = req.query.code as string;
      if (!code) {
        throw new UnauthorizedException('No code provided');
      }

      // Manejar el intercambio del código por una sesión y obtener el token JWT
      const { session } = await this.authService.handleCallback(code);

      // Redirigir al frontend con el token JWT
      const redirectUrl = new URL('/auth/success', process.env.FRONTEND_URL);
      redirectUrl.searchParams.append('token', session.access_token);
      
      return res.redirect(redirectUrl.toString());
    } catch (error) {
      // En caso de error, redirigir a la página de error con el mensaje
      const errorUrl = new URL('/auth/error', process.env.FRONTEND_URL);
      errorUrl.searchParams.append('message', encodeURIComponent(error.message));
      
      return res.redirect(errorUrl.toString());
    }
  }

  @Get('signout')
  async signOut(@Res() res: Response) {
    try {
      // Cerrar sesión en Supabase
      const result = await this.authService.signOut();
      return res.json(result);
    } catch (error) {
      return res.status(500).json({ message: 'Error al cerrar sesión' });
    }
  }

  @Get('session')
  @UseGuards(JwtAuthGuard)
  async getSession(@Req() req: Request) {
    try {
      const user: any = req.user; // Extraer el usuario desde el JWT

      if (!user) {
        throw new UnauthorizedException('No hay sesión activa');
      }

      // Verificar si el usuario está autorizado en la base de datos
      const authorizedUser = await this.prisma.authorizedUser.findUnique({
        where: { email: user.email }
      });

      if (!authorizedUser) {
        throw new UnauthorizedException('No estás autorizado para acceder a esta aplicación');
      }

      // Obtener información del usuario desde la base de datos
      const dbUser = await this.prisma.user.findUnique({
        where: { id: user.id }
      });

      return { user: dbUser };
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

}
