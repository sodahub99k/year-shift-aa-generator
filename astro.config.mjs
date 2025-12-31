// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://sodahub99k.github.io',
  base: process.env.GITHUB_PAGES ? '/yearshift' : '/',});
