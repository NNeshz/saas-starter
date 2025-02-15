import { ConfigService } from '@nestjs/config';

export const supabaseConfig = (configService: ConfigService) => ({
    supabaseUrl: configService.get('SUPABASE_URL'),
    supabaseKey: configService.get('SUPABASE_KEY'),
});

