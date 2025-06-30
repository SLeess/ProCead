
import path from 'path';
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
        target: 'http://127.0.0.1:8000',
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
      '@': path.resolve(__dirname, './src'),
    },
  },
})