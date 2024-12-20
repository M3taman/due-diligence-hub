import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', 'dist', '.history'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/setup.ts',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/*',
        '**/mocks/*'
      ],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80
      }
    },
    globals: true,
    environmentMatchGlobs: [
      ['**/*.dom.{test,spec}.{ts,tsx}', 'jsdom']
    ],
    pool: 'forks',
    isolate: true,
    maxConcurrency: 10,
    maxWorkers: 2,
    minWorkers: 1,
    silent: false,
    update: false,
    watch: false,
    reporters: ['default', 'html'],
    root: path.resolve(__dirname)
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});