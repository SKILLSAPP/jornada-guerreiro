import { createClient, SupabaseClient } from '@supabase/supabase-js';

// A tipagem do schema do banco é uma boa prática para ter segurança de tipos nas queries.
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      players: {
        Row: {
          id: string
          created_at: string
          name: string
          name_lowercase: string
          password: string
          player_data: Json
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          name_lowercase: string
          password: string
          player_data: Json
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          name_lowercase?: string
          password?: string
          player_data?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}


// Utiliza import.meta.env, que é a forma padrão e segura do Vite para acessar variáveis de ambiente.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase: SupabaseClient<Database> | null = null;
let supabaseInitializationError: string | null = null;

if (!supabaseUrl || !supabaseAnonKey) {
  supabaseInitializationError = "As chaves do reino de Supabase não foram encontradas. O Mestre deve configurar as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no arquivo de ambiente.";
} else {
  try {
    supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    supabaseInitializationError = e instanceof Error ? e.message : 'Erro desconhecido ao inicializar o Supabase.';
    console.error("Supabase client initialization failed:", e);
  }
}

export { supabase, supabaseInitializationError };