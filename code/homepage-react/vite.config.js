import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/homepage/',
  server: {
    port: 8080,
    host: 'localhost'
  }
})
