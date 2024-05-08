import path from 'path';
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import eslintPlugin from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), eslintPlugin()],
  resolve: {
    alias: { '@': path.join(__dirname, 'src') }
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]--[hash:base64:5]'
    }
  }
});
