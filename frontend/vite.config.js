
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import flowbiteReact from "flowbite-react/plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), flowbiteReact()],
  server: {
    proxy:{
      '/api': {
        target: import.meta.env.VITE_API_BASE_URL,
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
      '@': fileURLToPath(new URL(import.meta.env.VITE_APP_BASE_URL, import.meta.url)),
    },
  },
})