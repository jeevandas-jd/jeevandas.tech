import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/dev/',  // ← CRITICAL: This sets the base path for all assets
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  }
})
