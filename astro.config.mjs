import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://sodahub99k.github.io',
  base: process.env.GITHUB_PAGES ? '/yearshift' : '/',
});
