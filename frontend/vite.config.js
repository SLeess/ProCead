
import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv  } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig(({mode}) => {

  const currentDir = fileURLToPath(new URL('.', import.meta.url))

  const env = loadEnv(mode, currentDir, 'VITE_');

  return {
    plugins: [react(), tailwindcss(), flowbiteReact()],
    server: {
      port: 5173,
      proxy:{
        '/api': {
          target: env.VITE_API_URL,
          changeOrigin: true,
          headers: {
            Accept: 'application/json',
            "Content-Type": 'application/json',
          },
        }
      }
    },
    resolve: {
      alias: {
        // Aqui estamos dizendo ao Vite: sempre que encontrar '@' no início de um import,
        // substitua por 'caminho/absoluto/do/projeto/src'
        '@': fileURLToPath(new URL(env.VITE_APP_BASE_URL, import.meta.url)),
      },
    },
  }
})