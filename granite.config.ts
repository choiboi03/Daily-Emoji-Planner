import { defineConfig } from '@apps-in-toss/web-framework/config';

export default defineConfig({
  appName: 'daily-emoji-planner',
  brand: {
    displayName: '데일리 이모지 플래너',
    primaryColor: '#FF6B6B',
    icon: '',
  },
  web: {
    host: 'localhost',
    port: 5173,
    commands: {
      dev: 'vite dev',
      build: 'vite build',
    },
  },
  permissions: [],
  outdir: 'dist',
});
