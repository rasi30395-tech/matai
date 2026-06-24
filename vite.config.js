import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]'
      }
    }
  },
  server: {
    allowedHosts: true,
    proxy: {
      '/solution': 'http://127.0.0.1:5000',
      '/generate_video': 'http://127.0.0.1:5000',
      '/login': 'http://127.0.0.1:5000',
      '/auth': 'http://127.0.0.1:5000',
      '/logout': 'http://127.0.0.1:5000',
      '/static': 'http://127.0.0.1:5000'
    }
  }
})
