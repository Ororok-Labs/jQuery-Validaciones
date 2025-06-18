import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.js',
      name: 'Validaciones',
      fileName: 'validaciones',
      formats: ['umd'],
    },
    outDir: 'lib',
    rollupOptions: {
      output: {
        globals: {
          jquery: '$'
        }
      },
      external: ['jquery']
    }
  }
});