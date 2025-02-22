import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './strategies/google.strategy';
import { SupabaseConfig } from 'src/config/supabase-config';
import { ConfigModule } from '@nestjs/config';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  imports: [ConfigModule],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, SupabaseConfig, SupabaseService],
})
export class AuthModule {}
