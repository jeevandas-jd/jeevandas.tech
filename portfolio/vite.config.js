import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dev/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash][extname]'
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})