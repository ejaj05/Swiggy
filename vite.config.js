import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/swiggy-api': {
        target: 'https://www.swiggy.com', 
        changeOrigin: true,
        rewrite: path => path.replace(/^\/swiggy-api/, ''),
      },
    },
  },
})

