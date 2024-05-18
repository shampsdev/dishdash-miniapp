import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import rewriteAll from 'vite-plugin-rewrite-all';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), rewriteAll()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
