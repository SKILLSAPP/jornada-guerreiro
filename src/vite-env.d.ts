// FIX: Manually define types for import.meta.env as the /// <reference> directive was failing to resolve vite/client types. This provides the necessary type definitions for Vite environment variables and resolves compilation errors.

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
