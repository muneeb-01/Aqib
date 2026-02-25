import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      '@': '/src', // Alias '@' to the 'src' directory
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/App/Modules/Common/Components'), // Alias '~components' to 'src/components'
      // User defined modules
      '@common': path.resolve(__dirname, './src/App/Modules/Common'),
      '@accounting': path.resolve(__dirname, './src/App/Modules/Accounting'),
      '@security': path.resolve(__dirname, './src/App/Modules/Security'),
    },
  },
  server: {
    port: 3000
  }
})
