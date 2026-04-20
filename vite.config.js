/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE_PATH at build time. Defaults to the GitHub Pages repo path.
// Override with `BASE_PATH=/ npm run build` for a custom domain.
const base = process.env.BASE_PATH || '/plant-or-pull/'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? base : '/',
  plugins: [react()],
  server: { host: true, port: 5173 },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.js'],
  },
}))
