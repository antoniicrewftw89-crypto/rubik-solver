import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // rubiks-cube-solver es CJS — Vite lo pre-bundlea como ESM automáticamente
    include: ['rubiks-cube-solver'],
  },
  test: {
    environment: 'node',
  },
})
