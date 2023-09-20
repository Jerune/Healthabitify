import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
        // proxy: {
        //   '/v2': 'https://api.ouraring.com'
        // }
      },
  plugins: [react()],
})
