import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El sitio se publica en un subpath de GitHub Pages.
export default defineConfig({
  base: '/ordena-landing/',
  plugins: [react()],
});
