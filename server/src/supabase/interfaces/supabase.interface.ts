import { SupabaseClient } from '@supabase/supabase-js';

export interface ISupabaseService {
  getClient(): SupabaseClient;
}