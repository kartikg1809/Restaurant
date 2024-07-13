import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api':{
        target: 'http://restaurantserver-kartiks-projects-afb6be03.vercel.app',
        secure:false,
      }
    }
  },
  plugins: [preact()],
})
