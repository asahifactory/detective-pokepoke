// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/detective-pokepoke/', // or whatever your repo name is
  plugins: [react()],
})
