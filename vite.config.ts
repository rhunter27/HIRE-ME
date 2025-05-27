import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  envDir: './environment', // Changed from './env' to match your actual folder
  plugins: [react()],
  server: {
    port: 3000, // Change to a different port
  },
});