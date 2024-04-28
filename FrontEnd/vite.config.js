import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    assetsInlineLimit: 0,
    assetsInclude: ['**/*.PNG', '**/*.jpg', '**/*.jpeg', '**/*.svg', '**/*.gif'],
  },
})