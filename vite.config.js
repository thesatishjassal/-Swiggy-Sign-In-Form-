import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080', // Your Spring Boot backend running on port 8080
        changeOrigin: true, // Changes the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api\/v1/, '/api/v1'), // Rewrites the URL path to match the backend's endpoint
      },
    },
  },
});
