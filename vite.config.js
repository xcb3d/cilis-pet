import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    allowedHosts: [
      '3c78-42-119-88-184.ngrok-free.app'
    ],
  },
  plugins: [react()],
})
