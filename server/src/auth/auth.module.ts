import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { SupabaseConfig } from 'src/config/supabase-config';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from 'src/supabase/supabase.service';
import { PrismaModule } from '../prisma/prisma.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { JwtAuthGuard } from './guards/jwt-guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles-guards/roles.guard';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    SupabaseModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SupabaseConfig, SupabaseService, JwtAuthGuard, RolesGuard],
  exports: [AuthService, JwtAuthGuard, RolesGuard],
})
export class AuthModule { }
