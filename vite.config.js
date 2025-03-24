import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  base: isProd ? '/nfl_schedule_vue/' : '/',
  plugins: [vue()]
})
