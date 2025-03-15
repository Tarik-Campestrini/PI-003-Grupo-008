import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000/api/auth/register", // Altere para a porta do backend, se necessário
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  
})
