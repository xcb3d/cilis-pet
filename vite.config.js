import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      'd4d7-42-116-54-68.ngrok-free.app'
    ],
  },
  plugins: [react()],
})
