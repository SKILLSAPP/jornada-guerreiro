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
    // No entanto, para compatibilidade com bibliotecas que ainda usam `process.env` (como o @google/genai SDK),
    // mantemos a definição explícita para `process.env.API_KEY`.
    // As variáveis do Supabase usarão o padrão do Vite `import.meta.env` diretamente no código.
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
  };
});