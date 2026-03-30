import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import { resolve } from 'path';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: {
      '@env': resolve(__dirname, 'src/environments'),
      '@shared': resolve(__dirname, 'src/app/shared'),
    },
  },
  test: {
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    environment: 'jsdom',
    include: ['src/**/*.spec.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/app/**/*.ts'],
      exclude: ['src/app/**/*.spec.ts', 'src/main.ts'],
    },
  },
});
