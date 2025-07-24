import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
  ],
  server: {
    port: 4000, 
  },
    esbuild: {
    jsx: 'automatic',
  },
    build: {
    chunkSizeWarningLimit: 3000, 
  },
})
