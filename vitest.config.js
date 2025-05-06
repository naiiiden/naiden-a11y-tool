import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['scripts/utils/tests-global-setup.js'],
    reporters: ['verbose']
  },
});