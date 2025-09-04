import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Carrega as variáveis de ambiente do arquivo .env no diretório raiz.
  // Apenas variáveis com prefixo 'VITE_' são expostas ao cliente via import.meta.env.
  // FIX: Cast `process` to `any` to bypass a TypeScript type error (`Property 'cwd' does not exist on type 'Process'`).
  // This is a workaround for an environment where Node.js global types are not properly configured.
  const env = loadEnv(mode, (process as any).cwd(), '');

  return {
    plugins: [react()],
    // Define as variáveis de ambiente para o código do cliente.
    // O Vite substitui `import.meta.env` automaticamente.
    // Para o SDK @google/genai, que pode usar `process.env`,
    // definimos explicitamente a chave para garantir compatibilidade.
    // A origem agora é VITE_API_KEY, padronizando com o Supabase.
    define: {
      'process.env.API_KEY': JSON.stringify(env.VITE_API_KEY),
    },
  };
});